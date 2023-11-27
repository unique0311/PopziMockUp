import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {
  openSettings,
  requestMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import {connect} from 'react-redux';
import CameraRoll from '@react-native-community/cameraroll';
import {RNCamera} from 'react-native-camera';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import Sound from 'react-native-sound';

import Button from '../components/Button';
import BottomBar from '../components/BottomBar';
import BurstShot from '../components/BurstShot';

import Images from '../theme/Images';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

import {Status} from '../constants.js';
import actionTypes from '../actions/actionTypes';

//  constant value
const CAMERA_READY = 'CAMERA_READY';
const CAMERA_BURST_CAPTURING = 'CAMERA_BURST_CAPTURING';
const VIDEO_RECORDING = 'VIDEO_RECORDING';
const VIDEO_UNRECORDING = 'VIDEO_UNRECORDING';

const CAMERA_TYPE_BACK = RNCamera.Constants.Type.back;
const CAMERA_TYPE_FRONT = RNCamera.Constants.Type.front;

const CAMERA_FLASH_OFF = RNCamera.Constants.FlashMode.off;
const CAMERA_FLASH_ON = RNCamera.Constants.FlashMode.on;
const CAMERA_FLASH_AUTO = RNCamera.Constants.FlashMode.auto;

const captureIcon = {
  CAMERA_READY: Images.capture_icon,
  VIDEO_UNRECORDING: Images.video_record_play_icon,
  VIDEO_RECORDING: Images.video_record_stop_icon,
};

const Permissions = {
  android: [
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.CAMERA,
  ],
  ios: [],
};

const screenWidth = Dimensions.get('window').width;
let recordingTimer = null; //  timer for recording video

var bingSound = new Sound('bing.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

class CaptureScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      cmodalVisible: false, //  burst capture modal
      fmodalVisible: false, //  flash mode modal
      counterVisible: false, //  counter visible mode
      initialTime: 5, //  second
      pictureTime: 3, //  second
      shotNumber: 3,
      cvStatus: CAMERA_READY,
      cameraType: CAMERA_TYPE_BACK,
      cameraFlashMode: CAMERA_FLASH_AUTO,
      latestPhoto: '',
      count: 5, // time for initialTime
      recordingTime: 0, // time for recording video, second
      disableScreen: false, // disable screen while bursting capture
    };
  }
  //  set latest photo
  setLatestPhoto = (isUpdated = false) => {
    //  Get the latest photo uri
    let _SELF = this;
    CameraRoll.getPhotos({first: 1})
      .then(photos => {
        photos.edges.length != 0 &&
          _SELF.setState({
            latestPhoto: photos.edges[0].node.image.uri,
          });
        console.log(photos.edges[0].node.image.uri);
      })
      .catch(err => {
        console.log('----Get Photos Error----', err);
      });
  };

  takePicture = async () => {
    let _SELF = this;
    if (this.camera) {
      const options = {quality: 1, base64: true};
      this.camera.takePictureAsync(options).then(cacheData => {
        CameraRoll.save(cacheData.uri)
          .then(uri => {
            _SELF.setLatestPhoto(true);
            this.shotNumber--;
            if (this.shotNumber > 0) {
              setTimeout(() => {
                _SELF.takePicture();
              }, this.state.pictureTime * 1000);
            } else {
              console.log('----capture done ----');
              setTimeout(() => {
                _SELF.setState({disableScreen: false, cvStatus: CAMERA_READY});
              }, this.state.pictureTime * 1000);
            }
          })
          .catch(err => {
            console.log('----take picture error----', err);
            Alert.alert(
              "The camera can't work",
              'Please check your device or permission.',
              [{text: 'OK'}],
            );
            this.setState({disableScreen: false, cvStatus: CAMERA_READY});
          });
      });
    }
  };

  // Single shot
  takeCaptureOnce = () => {
    this.shotNumber = 1;
    this.takePicture();
  };

  // Multiple shot
  burstCapture = async () => {
    this.shotNumber = this.state.shotNumber;
    this.takePicture();
  };

  startBurstCapture = () => {
    let _SELF = this;
    this.setState({
      counterVisible: true,
      count: this.state.initialTime,
      cvStatus: CAMERA_BURST_CAPTURING,
    });
    bingSound.play();
    console.log('----start burst capture---');
    let count = _SELF.state.initialTime;
    let interval = setInterval(() => {
      if (count > 1) {
        _SELF.setState({count: count - 1});
        bingSound.stop(() => {
          // Note: If you want to play a sound after stopping and rewinding it,
          // it is important to call play() in a callback.
          bingSound.play();
        });
      } else {
        bingSound.stop();
        clearInterval(interval);
        _SELF.setState({counterVisible: false, disableScreen: true});
        _SELF.burstCapture();
      }
      count--;
    }, 1000);

    this.props.dispatch({
      type: actionTypes.CANCEL_SUBSCRIPTION,
      user_id: this.props.currentUser._id,
      productId:
        this.props.currentSubscription != null
          ? this.props.currentSubscription.productId
          : null,
    });
  };

  async startRecording() {
    // const recordOptions = {
    console.log('record start...');
    this.setState({
      cvStatus: VIDEO_RECORDING,
      disableScreen: true,
    });
    let _SELF = this;
    recordingTimer = setInterval(() => {
      _SELF.setState({recordingTime: _SELF.state.recordingTime + 1});
    }, 1000);

    // default to mp4 for android as codec is not set
    const {uri, codec = 'mp4'} = await this.camera.recordAsync();
    console.log('video uri', uri);
    CameraRoll.save(uri)
      .then(resUri => {
        console.log('Take Video Uri', resUri);
      })
      .catch(err => {
        console.log('----take picture error----', err);
      });
  }

  stopRecording() {
    console.log('record stop...');
    this.camera.stopRecording();
    this.setState({
      cvStatus: VIDEO_UNRECORDING,
      recordingTime: 0,
      disableScreen: false,
    });
    clearInterval(recordingTimer);
  }

  onCapture = () => {
    switch (this.state.cvStatus) {
      case CAMERA_READY:
        this.props.currentSubscription != null &&
        this.props.currentSubscription.productId
          ? this.startBurstCapture()
          : this.takeCaptureOnce();
        break;
      case VIDEO_UNRECORDING:
        this.startRecording();
        break;
      case VIDEO_RECORDING:
        this.stopRecording();
        break;
    }
  };

  //  When click gallery button
  onGallery = () => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL('photos-redirect://');
        break;
      case 'android':
        Linking.openURL('content://media/internal/images/media');
        break;
      default:
        console.log('Could not open gallery app');
    }
  };

  //  When click camera mode
  onCamera = () => {
    this.state.cvStatus !== CAMERA_READY &&
      this.setState({cvStatus: CAMERA_READY});
  };

  //  When click video mode
  onVideo = () => {
    this.state.cvStatus === CAMERA_READY &&
      this.setState({cvStatus: VIDEO_UNRECORDING});
  };

  //  When click rotate mode
  onRotate = () => {
    this.state.cameraType === CAMERA_TYPE_BACK
      ? this.setState({cameraType: CAMERA_TYPE_FRONT})
      : this.setState({cameraType: CAMERA_TYPE_BACK});
  };

  setCModalVisible = visible => {
    this.setState({cmodalVisible: visible});
  };

  setFModalVisible = visible => {
    this.setState({fmodalVisible: visible});
  };

  //  Open the Burst Capture Modal
  onOpenBModal = () => {
    this.setCModalVisible(!this.state.cmodalVisible);
  };

  //  Open the Flush Modal
  onOpenFModal = () => {
    this.setFModalVisible(!this.state.fmodalVisible);
  };

  formatRecordingTime = () => {
    let time = this.state.recordingTime;
    let hour, minute, second;
    const format = t => (t < 10 ? '0' + t : t);

    second = time % 60;
    minute = Math.floor(time / 60);

    second = format(second);

    if (minute < 60) {
      minute = format(minute);
      return minute + ' : ' + second;
    }
    hour = Math.floor(minute / 60);
    minute = minute % 60;

    hour = format(hour);
    minute = format(minute);

    return hour + ' : ' + minute + ' : ' + second;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.getSubscriptionStatus != this.props.getSubscriptionStatus) {
      console.log(this.props.getSubscriptionStatus);
      if (this.props.getSubscriptionStatus == Status.SUCCESS) {
        console.log(this.props.subscription);
      } else if (this.props.getSubscriptionStatus == Status.FAILURE) {
      }
    }
    if (
      prevProps.cancelSubscriptionStatus != this.props.cancelSubscriptionStatus
    ) {
      console.log(this.props.cancelSubscriptionStatus);
      if (this.props.cancelSubscriptionStatus == Status.SUCCESS) {
        console.log(this.props.subscription);
      } else if (this.props.cancelSubscriptionStatus == Status.FAILURE) {
      }
    }
  }

  componentDidMount() {
    const platform = Platform.OS;
    requestMultiple(Permissions[platform])
      .then(statuses => {
        let isNeedOpenSettings = false;
        Permissions[platform].forEach(permission => {
          if (statuses[permission] != 'granted') isNeedOpenSettings = true;
        });
        isNeedOpenSettings == true &&
          openSettings().catch(() => console.warn('cannot open settings'));
      })
      .catch(err => {
        console.log('----request multiple permission----', err);
      });
    this.setLatestPhoto();
    this.props.dispatch({
      type: actionTypes.GET_SUBSCRIPTION,
      user_id: this.props.currentUser._id,
    });
  }

  render() {
    const {
      cmodalVisible,
      fmodalVisible,
      cvStatus,
      cameraType,
      cameraFlashMode,
      latestPhoto,
      recordingTime,
    } = this.state;
    const _SELF = this;
    const CaptureModal = () => (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setCModalVisible(false);
        }}>
        <View style={styles.cmodal}>
          <TouchableWithoutFeedback>
            <View style={styles.cmodContainer}>
              <Text style={styles.burstText}>BURST SHOT</Text>
              <BurstShot
                title="Initial Timer"
                value={this.state.initialTime}
                suffix="SEC"
                onChange={value => {
                  this.setState({initialTime: value, count: value});
                }}
              />
              <BurstShot
                title="Picture Timer"
                value={this.state.pictureTime}
                suffix="SEC"
                onChange={value => {
                  this.setState({pictureTime: value});
                }}
              />
              <BurstShot
                title="No. of Shot"
                // limitShot={this.props.currentSubscription == null ? true : false}
                value={this.state.shotNumber}
                onChange={value => {
                  this.setState({shotNumber: value});
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setCModalVisible(false);
                }}>
                <Image source={Images.shot_icon} style={styles.shotIcon} />
                {/* <Text style={styles.captureText}>CAPTURE</Text> */}
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );

    const FlashModal = () => (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setFModalVisible(false);
        }}>
        <View style={styles.fmodal}>
          <TouchableWithoutFeedback>
            <View style={styles.fmodContainer}>
              <Button
                type="icon"
                src={Images.flash_on_icon}
                width={20}
                height={20}
                onPress={() => {
                  _SELF.setFModalVisible(false);
                  _SELF.setState({cameraFlashMode: CAMERA_FLASH_ON});
                }}
              />
              <Button
                type="icon"
                src={Images.flash_off_icon}
                width={20}
                height={20}
                onPress={() => {
                  _SELF.setFModalVisible(false);
                  _SELF.setState({cameraFlashMode: CAMERA_FLASH_OFF});
                }}
              />
              <Button
                type="icon"
                src={Images.flash_icon}
                width={20}
                height={20}
                onPress={() => {
                  _SELF.setFModalVisible(false);
                  _SELF.setState({cameraFlashMode: CAMERA_FLASH_AUTO});
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );

    const Counter = ({visible, status, count}) => (
      <View style={[styles.absolute, styles.counterView]}>
        {status != null && (
          <Text style={styles.counterStatusText}>{status}</Text>
        )}
        <Text style={styles.counterCountText}>{count}</Text>
      </View>
    );

    let flashIcon;
    if (cameraFlashMode === CAMERA_FLASH_ON) flashIcon = Images.flash_on_icon;
    else if (cameraFlashMode === CAMERA_FLASH_OFF)
      flashIcon = Images.flash_off_icon;
    else if (cameraFlashMode === CAMERA_FLASH_AUTO)
      flashIcon = Images.flash_icon;

    return (
      <View style={{flex: 1, backgroundColor: Colors.greenBrightColor}}>
        <View style={styles.container}>
          {/*------------Capture Modal---------------*/}
          {cmodalVisible && <CaptureModal />}
          {/*------------Flash Modal-----------------*/}
          {fmodalVisible && <FlashModal />}
          {this.state.counterVisible && <Counter count={this.state.count} />}
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={cameraType}
            flashMode={cameraFlashMode}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={true}>
            {({camera, status, recordAudioPermissionStatus}) => {
              if (status != 'READY') return <></>;
              return (
                <>
                  <View style={styles.funcView}>
                    {cvStatus == CAMERA_READY && (
                      <>
                        <Button
                          type="icon"
                          src={flashIcon}
                          width={20}
                          height={20}
                          onPress={this.onOpenFModal}
                          style={{zIndex: 3}}
                        />
                        <Button
                          type="icon"
                          src={Images.time_icon}
                          width={20}
                          height={20}
                          onPress={this.onOpenBModal}
                          style={{zIndex: 4}}
                        />
                      </>
                    )}
                  </View>
                  <View style={styles.middleView}>
                    <View style={styles.layout}>
                      <Image
                        source={Images.out_left_top_icon}
                        style={[styles.outIcon, styles.outLtIcon]}
                      />
                      <Image
                        source={Images.out_right_top_icon}
                        style={[styles.outIcon, styles.outRtIcon]}
                      />
                      <Image
                        source={Images.out_left_bottom_icon}
                        style={[styles.outIcon, styles.outLbIcon]}
                      />
                      <Image
                        source={Images.out_right_bottom_icon}
                        style={[styles.outIcon, styles.outRbIcon]}
                      />
                      {cvStatus != CAMERA_READY &&
                        cvStatus != CAMERA_BURST_CAPTURING && (
                          <Text style={styles.timer}>
                            {this.formatRecordingTime(recordingTime)}
                          </Text>
                        )}
                    </View>
                    {cvStatus != VIDEO_RECORDING &&
                    cvStatus != CAMERA_BURST_CAPTURING ? (
                      <View style={styles.actionView}>
                        {latestPhoto !== '' ? (
                          <Button
                            type="thumbnail"
                            src={{uri: latestPhoto}}
                            width={36}
                            height={36}
                            onPress={this.onGallery}
                          />
                        ) : (
                          <Button
                            type="thumbnail"
                            src={Images.feather_image_icon}
                            width={20}
                            height={20}
                            margin={10}
                            onPress={this.onGallery}
                          />
                        )}
                        {cvStatus != CAMERA_READY ? (
                          <Button
                            type="icon"
                            src={Images.feature_camera_icon}
                            width={20}
                            height={20}
                            onPress={this.onCamera}
                          />
                        ) : (
                          <Image
                            source={Images.feature_camera_icon}
                            style={styles.disableIcon}
                          />
                        )}
                        <Button
                          type="icon"
                          src={captureIcon[cvStatus]}
                          width={60}
                          height={60}
                          onPress={this.onCapture}
                        />
                        {cvStatus == CAMERA_READY ? (
                          <Button
                            type="icon"
                            src={Images.feature_video_icon}
                            width={20}
                            height={20}
                            onPress={this.onVideo}
                          />
                        ) : (
                          <Image
                            source={Images.feature_video_icon}
                            style={styles.disableIcon}
                          />
                        )}
                        <Button
                          type="icon"
                          src={Images.feature_rotate_icon}
                          width={20}
                          height={20}
                          onPress={this.onRotate}
                        />
                      </View>
                    ) : (
                      <View style={styles.actionView}>
                        <Button
                          type="icon"
                          src={captureIcon[cvStatus]}
                          width={60}
                          height={60}
                          onPress={this.onCapture}
                        />
                      </View>
                    )}
                  </View>
                </>
              );
            }}
          </RNCamera>
        </View>
        <BottomBar
          eleType="capture"
          disable={this.state.disableScreen}
          doNavigate={this.props.navigation.navigate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  funcView: {
    ...ifIphoneX(
      {
        marginTop: 50,
        marginBottom: 20,
      },
      {
        marginVertical: 20,
      },
    ),
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionView: {
    marginVertical: 10,
    paddingHorizontal: 20,
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  layout: {
    width: screenWidth,
    flex: 1,
  },
  cmodContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontFamily: Fonts.wsRegular,
  },
  fmodContainer: {
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  burstText: {
    fontSize: 24,
    color: 'white',
  },
  captureText: {
    color: Colors.yellowColor,
  },
  absolute: {
    position: 'absolute',
    top: 40,
    left: 0,
    bottom: 0,
    right: 0,
  },
  shotIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  outIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
  },
  outLtIcon: {
    left: 20,
  },
  outRtIcon: {
    right: 20,
  },
  outLbIcon: {
    left: 20,
    bottom: -70,
  },
  outRbIcon: {
    right: 20,
    bottom: -70,
  },
  counterStatusText: {
    fontSize: 40,
    color: '#ffffff',
  },
  counterCountText: {
    fontSize: 200,
    color: '#ffffff99',
  },
  counterView: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  timer: {
    alignSelf: 'center',
    top: 10,
    color: 'white',
    fontFamily: Fonts.latoRegular,
    fontSize: 14,
  },
  disableIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginHorizontal: 10,
    opacity: 0.5,
  },
  cmodal: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    ...ifIphoneX(
      {
        paddingTop: 150,
      },
      {
        paddingTop: 120,
      },
    ),
    paddingBottom: 120,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  fmodal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...ifIphoneX(
      {
        paddingTop: 80,
      },
      {
        paddingTop: 50,
      },
    ),
    zIndex: 2,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    currentSubscription: state.subscription.currentSubscription,
    cancelSubscriptionStatus: state.subscription.cancelSubscriptionStatus,
    getSubscriptionStatus: state.subscription.getSubscriptionStatus,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptureScreen);
