import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  PermissionsAndroid,
  Platform,
  NativeModules,
} from 'react-native';

const {RNTwitterSignIn} = NativeModules;

import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast';
import SplashScreen from 'react-native-splash-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import InstagramLogin from 'react-native-instagram-login';
import RoundTextInput from '../components/RoundTextInput';
import RoundButton from '../components/RoundButton';
import Button from '../components/Button';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {isValidEmail, checkInternetConnectivity} from '../functions';
import LoadingOverlay from '../components/LoadingOverlay';
import {
  TOAST_SHOW_TIME,
  Status,
  TWITTER_COMSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET,
  INSTAGRAM_REDIRECT_URI,
} from '../constants.js';
import actionTypes from '../actions/actionTypes';
import * as Storage from '../services/Storage';

import Messages from '../theme/Messages';
import Images from '../theme/Images';
import Fonts from '../theme/Fonts';
import Colors from '../theme/Colors';

class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.restoreUser();
  }

  async restoreUser() {
    // Update User ID.
    const user_id = await Storage.USERID.get();
    if (user_id && user_id.length > 0) {
      this.setState({isLoading: true});
      this.props.dispatch({
        type: actionTypes.RESTORE_USER,
        user_id: user_id,
      });
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loginUserStatus != this.props.loginUserStatus) {
      if (this.props.loginUserStatus == Status.SUCCESS) {
        this.loginSuccess();
      } else if (this.props.loginUserStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }

    if (prevProps.loginWithSocialStatus != this.props.loginWithSocialStatus) {
      if (this.props.loginWithSocialStatus == Status.SUCCESS) {
        this.loginWithSocialSuccess();
      } else if (this.props.loginWithSocialStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
    if (prevProps.restoreUserStatus != this.props.restoreUserStatus) {
      if (
        this.props.restoreUserStatus == Status.SUCCESS &&
        this.props.currentUser &&
        this.props.currentUser._id
      ) {
        this.onMoveHome(false);
      } else if (this.props.restoreUserStatus == Status.FAILURE) {
        setTimeout(function () {
          SplashScreen.hide();
        }, 2000);
        this.setState({isLoading: false});
      }
    }
    if (
      prevProps.getInstagramUserProfileStatus !=
      this.props.getInstagramUserProfileStatus
    ) {
      if (this.props.getInstagramUserProfileStatus == Status.SUCCESS) {
        let {id, username, avatar} = this.props.instagramUserProfile;
        console.log(this.props.instagramUserProfile);
        let user = {
          socialId: id,
          socialType: 'instagram',
          firstName: username,
          lastName: '',
          email: '',
          avatar: '',
        };
        this.props.dispatch({
          type: actionTypes.LOGIN_WITH_SOCIAL,
          user: user,
        });
      } else if (this.props.getInstagramUserProfileStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  async onMoveHome(animate) {
    // Reset Page.
    this.setState({isLoading: false, email: '', password: ''});

    // Move Next Page.

    this.props.navigation.navigate('Capture');
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Capture'}],
    });
  }

  onLogin() {
    this.setState({errorMessage: null});

    Keyboard.dismiss();

    let email = this.state.email.trim();
    let password = this.state.password.trim();

    var isValid = true;
    if (email == null || email.length <= 0 || !isValidEmail(email)) {
      this.setState({emailError: Messages.InvalidEmail});
      isValid = false;
    }

    if (password == null || password.length <= 0) {
      this.setState({passwordError: Messages.InvalidPassword});
      isValid = false;
    }

    if (isValid) {
      this.setState({isLoading: true}, () => {
        this.props.dispatch({
          type: actionTypes.LOGIN_USER,
          email: email,
          password: password,
        });
      });
    }
  }

  onForgotPassword() {
    Keyboard.dismiss();
    this.props.navigation.navigate('ForgotPassword');
  }

  async onFB() {
    Keyboard.dismiss();
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      this.setState({isLoading: true, errorMessage: null});
      const _SELF = this;
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        function (result) {
          if (result.isCancelled) {
            _SELF.setState({isLoading: false});
            _SELF.toast.show(
              'Facebook Login has been cancelled',
              TOAST_SHOW_TIME,
            );
          } else {
            AccessToken.getCurrentAccessToken().then(token => {
              let accessToken = token.accessToken;
              const responseCallback = (error, result) => {
                if (error) {
                  _SELF.setState({isLoading: false});
                  _SELF.toast.show(error, TOAST_SHOW_TIME);
                } else {
                  var socialId = '';
                  var socialType = 'facebook';
                  var firstName = '';
                  var lastName = '';
                  var email = '';
                  var avatar = '';

                  if (result.id) {
                    socialId = result.id;
                  }

                  if (result.first_name) {
                    firstName = result.first_name;
                  }

                  if (result.last_name) {
                    lastName = result.last_name;
                  }

                  if (result.email) {
                    email = result.email;
                  }

                  if (
                    result.picture &&
                    result.picture.data &&
                    result.picture.data.url
                  ) {
                    avatar = result.picture.data.url;
                  }

                  let user = {
                    socialId,
                    socialType,
                    firstName,
                    lastName,
                    email,
                    avatar,
                  };

                  _SELF.props.dispatch({
                    type: actionTypes.LOGIN_WITH_SOCIAL,
                    user: user,
                  });
                }
              };
              const profileRequest = new GraphRequest(
                '/me?fields=id,first_name,last_name,name,picture.type(large),email,gender',
                null,
                responseCallback,
              );
              new GraphRequestManager().addRequest(profileRequest).start();
            });
          }
        },
        function (error) {
          _SELF.setState({isLoading: false});
          if (_SELF.toast) {
            _SELF.toast.show(
              'Facebook Login has been failed.',
              TOAST_SHOW_TIME,
            );
          }
        },
      );
    } else {
      this.toast.show(Messages.NetWorkError, TOAST_SHOW_TIME);
    }
  }

  async onTwitter() {
    RNTwitterSignIn.init(TWITTER_COMSUMER_KEY, TWITTER_CONSUMER_SECRET);
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData);

        const {authToken, authTokenSecret, name, userID, userName, email} =
          loginData;
        if (authToken && authTokenSecret) {
          let user = {
            socialId: userID,
            socialType: 'twitter',
            firstName: userName,
            lastName: '',
            email,
            avatar: '',
          };

          this.props.dispatch({
            type: actionTypes.LOGIN_WITH_SOCIAL,
            user: user,
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (this.toast) {
          this.toast.show('Twitter Login has been canceled.', TOAST_SHOW_TIME);
        }
      });
  }

  onInstagram() {
    this.instagramLogin.show();
  }

  instagramLoginSuccess = data => {
    this.instagramLogin.hide();
    const {user_id, access_token} = data;
    this.props.dispatch({
      type: actionTypes.GET_INSTAGRAM_USER_PROFILE,
      user_id,
      access_token,
    });
  };

  instagramLoginFailure = err => {
    console.log(err);
    if (this.toast) {
      this.toast.show('Instagram Login has been canceled.', TOAST_SHOW_TIME);
    }
  };

  onRegister() {
    Keyboard.dismiss();
    this.props.navigation.navigate('SignUp', {user: null});
  }

  async loginSuccess() {
    this.setState({isLoading: false});
    Storage.USERID.set(this.props.currentUser._id);
    this.onMoveHome(true);
  }

  async loginWithSocialSuccess() {
    this.setState({isLoading: false});
    if (this.props.needToSignUp) {
      this.props.navigation.navigate('SignUp', {user: this.props.currentUser});
    } else {
      Storage.USERID.set(this.props.currentUser._id);
      this.onMoveHome(true);
    }
  }

  onChangeEmail = text => {
    if (text && text != '' && isValidEmail(text)) {
      this.setState({email: text, emailError: null});
    } else {
      this.setState({email: text});
    }
  };

  onFailure(message) {
    this.setState({isLoading: false});
    if (message && message.length > 0) {
      this.toast.show(message, TOAST_SHOW_TIME);
    } else {
      this.toast.show(Messages.NetWorkError, TOAST_SHOW_TIME);
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.greenColor}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <View style={styles.contentView}>
                <Image source={Images.main_logo} style={styles.logoImage} />
                <Text style={styles.loginAccountText}>LOGIN ACCOUNT</Text>
                <View style={styles.formView}>
                  <View style={styles.inputForm}>
                    <RoundTextInput
                      placeholder="Email"
                      type="email"
                      placeholderTextColor={Colors.greenColor}
                      value={this.state.email}
                      errorMessage={this.state.emailError}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.passwordInput.focus();
                      }}
                      onChangeText={this.onChangeEmail}
                      inlineImage="icon_in_email"
                    />

                    <RoundTextInput
                      placeholder="Password"
                      type="password"
                      placeholderTextColor={Colors.greenColor}
                      returnKeyType="done"
                      showPassword={true}
                      value={this.state.password}
                      errorMessage={this.state.passwordError}
                      onRefInput={input => {
                        this.passwordInput = input;
                      }}
                      onChangeText={text =>
                        this.setState({password: text, passwordError: null})
                      }
                      onSubmitEditing={() => {
                        this.onLogin();
                      }}
                      inlineImage="icon_in_pwd"
                    />

                    <View style={{alignItems: 'flex-end', marginVertical: 10}}>
                      <Button
                        title="Forgot password"
                        color="#2D2D2D"
                        type="text"
                        onPress={() => this.onForgotPassword()}
                      />
                    </View>

                    <View style={[styles.centerView]}>
                      <RoundButton
                        title="LOGIN"
                        theme="black"
                        style={styles.btn}
                        onPress={() => this.onLogin()}
                      />
                      <RoundButton
                        title="CREATE ACCOUNT"
                        theme="red"
                        style={styles.btn}
                        onPress={() => this.onRegister()}
                      />
                    </View>
                  </View>
                </View>
                <Text style={styles.orText}>OR LOGIN VIA</Text>
                <View style={styles.socialView}>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => this.onFB()}>
                    <Image
                      style={styles.socialIcon}
                      source={Images.btn_facebook}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => this.onTwitter()}>
                    <Image
                      style={styles.socialIcon}
                      source={Images.btn_twitter}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => this.onInstagram()}>
                    <Image style={styles.socialIcon} source={Images.btn_cool} />
                  </TouchableOpacity>
                </View>
                <InstagramLogin
                  ref={ref => (this.instagramLogin = ref)}
                  appId={INSTAGRAM_APP_ID}
                  appSecret={INSTAGRAM_APP_SECRET}
                  redirectUrl={INSTAGRAM_REDIRECT_URI}
                  scopes={['user_profile']}
                  onLoginSuccess={this.instagramLoginSuccess}
                  onLoginFailure={this.instagramLoginFailure}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </SafeAreaView>
        <Toast ref={ref => (this.toast = ref)} />
        {this.state.isLoading && <LoadingOverlay />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: Fonts.WorkSans,
  },
  loginAccountText: {
    fontSize: 18,
    fontFamily: Fonts.wsSemiBold,
  },
  contentView: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 40,
    ...ifIphoneX(
      {
        marginTop: 50,
      },
      {
        marginTop: 60,
      },
    ),
  },

  logoImage: {
    width: '80%',
    resizeMode: 'contain',
    marginTop: 50,
    marginBottom: 30,
  },

  formView: {
    width: '100%',
    overflow: 'hidden',
  },

  inputForm: {
    paddingHorizontal: 15,
    paddingVertical: 30,
  },

  btn: {
    width: '100%',
  },

  centerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  socialButton: {
    marginLeft: 3,
    marginRight: 3,
  },

  socialIcon: {
    width: 90,
    height: 60,
    borderRadius: 10,
  },

  orText: {
    fontFamily: Fonts.Montserrat,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 10,
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
    needToSignUp: state.user.needToSignUp,
    errorMessage: state.user.errorMessage,
    loginUserStatus: state.user.loginUserStatus,
    loginWithSocialStatus: state.user.loginWithSocialStatus,
    restoreUserStatus: state.user.restoreUserStatus,
    getInstagramUserProfileStatus: state.user.getInstagramUserProfileStatus,
    instagramUserProfile: state.user.instagramUserProfile,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
