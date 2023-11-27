import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-easy-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ifIphoneX } from 'react-native-iphone-x-helper'

import LoadingOverlay from '../components/LoadingOverlay';
import EditAvatar from '../components/EditAvatar'
import BottomBar from '../components/BottomBar';
import RoundTextInput from '../components/RoundTextInput';
import RoundButton from '../components/RoundButton';
import ProfileEdit from '../components/ProfileEdit';
import Button from '../components/Button';

import Messages from '../theme/Messages';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import Images from "../theme/Images";

import actionTypes from '../actions/actionTypes';
import { Status, TOAST_SHOW_TIME, PASSWORD_MIN_LENGTH } from '../constants'
import { compressImage } from '../functions';


class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    const {
      email,
      phone,
      address,
    } = this.props.currentUser;

    this.state = {
      email,
      phone,
      address,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      currentPwdError: '',
      newPwdError: '',
      confirmPwdError: '',
      avatar: '',
      isLoading: false,
    }
  }

  onTakePicture() {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, async (res) => {
      if (res.didCancel != true) {
        this.setState({avatar: res.uri, isLoading: true});

        const compressedAvatar = await compressImage(res);

        this.props.dispatch({
          type: actionTypes.CHANGE_AVATAR,
          user_id: this.props.currentUser._id,
          new_avatar: compressedAvatar
        });
      }
    });
	}

  onSuccess(message) {
    this.toast.show(message, TOAST_SHOW_TIME);
  }

  onFailure(message) {
    if (message && message.length > 0) {
      this.toast.show(message, TOAST_SHOW_TIME);
    }
    else {
      this.toast.show(Messages.NetWorkError, TOAST_SHOW_TIME);
    }
  }

  onChangePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = this.state;
    let isValid = true;
    
    if (currentPassword === null || currentPassword.length <=0 || currentPassword === undefined){
      this.setState({currentPwdError: Messages.InvalidCurrentPassword});
      isValid = false;
    }
    else if(currentPassword.length < PASSWORD_MIN_LENGTH) {
      this.setState({currentPwdError: Messages.ShortPasswordError});
      isValid = false;
    }
    if (newPassword === null || newPassword.length <=0 || newPassword === undefined){
      this.setState({newPwdError: Messages.InvalidNewPassword});
      isValid = false;
    }
    else if(newPassword.length < PASSWORD_MIN_LENGTH) {
      this.setState({newPwdError: Messages.ShortPasswordError});
      isValid = false;
    }
    if (confirmPassword != newPassword){
      this.setState({confirmPwdError: Messages.InvalidConfirmPassword});
      isValid = false;
    }
    
    if (isValid) {
      this.props.dispatch({
        type: actionTypes.CHANGE_PASSWORD,
        user_id: this.props.currentUser._id,
        old_password: currentPassword,
        new_password: newPassword,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.changeAvatarStatus != this.props.changeAvatarStatus) {
      if (this.props.changeAvatarStatus == Status.SUCCESS) {
        this.props.dispatch({
          type: actionTypes.GET_USER,
          user_id: this.props.currentUser._id,
        });
        this.setState({avatar: '', isLoading: false});
        this.onSuccess(Messages.AlertChangeAvatar);
      } else if (this.props.changeAvatarStatus == Status.FAILURE) {
        this.setState({isLoading: false});
        this.onFailure(this.props.errorMessage);
      }
    }
    if (prevProps.changePasswordStatus != this.props.changePasswordStatus) {
      if (this.props.changePasswordStatus == Status.SUCCESS) {
        this.setState({isLoading: false, currentPassword: '', newPassword: '', confirmPassword: ''});
        this.onSuccess(Messages.AlertChangePassword);

      } else if (this.props.changePasswordStatus == Status.FAILURE) {
        this.setState({isLoading: false});
        this.onFailure(this.props.errorMessage);
      }
    }
    if (prevProps.changeEmailStatus != this.props.changeEmailStatus) {
      if (this.props.changeEmailStatus == Status.SUCCESS) {
        this.setState({isLoading: false});
        this.onSuccess(Messages.AlertChangeEmail);

      } else if (this.props.changeEmailStatus == Status.FAILURE) {
        this.setState({isLoading: false});
        this.onFailure(this.props.errorMessage);
      }
    }
    if (prevProps.changePhoneStatus != this.props.changePhoneStatus) {
      if (this.props.changePhoneStatus == Status.SUCCESS) {
        this.setState({isLoading: false});
        this.onSuccess(Messages.AlertChangePhoneNumber);

      } else if (this.props.changePhoneStatus == Status.FAILURE) {
        this.setState({isLoading: false});
        this.onFailure(this.props.errorMessage);
      }
    }
    if (prevProps.changeAddressStatus != this.props.changeAddressStatus) {
      if (this.props.changeAddressStatus == Status.SUCCESS) {
        this.setState({password: '', isLoading: false});
        this.onSuccess(Messages.AlertChangeAddress);

      } else if (this.props.changeAddressStatus == Status.FAILURE) {
        this.setState({isLoading: false});
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onSignup = () => {

    AsyncStorage.clear();
    this.props.navigation.popToTop();

    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}]
    });
  }

  render() {

    const { firstName, lastName, _id, avatar } = this.props.currentUser;
    let Aavatar = this.state.avatar;
    const isNewAvatar = Aavatar != '' && Aavatar != undefined && Aavatar.length;
    Aavatar = isNewAvatar ? Aavatar : avatar
    let { email, phone, address } = this.state;
    const _SELF = this;

    return (
      <View style={{flex: 1, backgroundColor: Colors.greenBrightColor}}>
        <SafeAreaView style={{flex: 1}}>
          <Button
              type='icon'
              src={Images.back_arrow}
              width={40}
              height={40}
              style={styles.backArrow}
              onPress={this.onSignup}
          />
          <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.topView}>
                  <Text style={styles.profileText}>PROFILE</Text>
                  <EditAvatar avatar={Aavatar} onTakePhoto={() => this.onTakePicture()} />
                  <Text style={styles.fullname}>{firstName + " " + lastName}</Text>
                </View>
                <View style={styles.bottomView}>
                  <ProfileEdit type="email" title="Email Address" content={email} parent={this}
                    onSubmit={(value) => {
                      this.props.dispatch({
                        type: actionTypes.CHANGE_EMAIL,
                        user_id: _id,
                        new_email: value
                      });
                      this.setState({ email: value,isLoading: true });
                    }}
                  />
                  <ProfileEdit type="contact" title="Contact No." content={phone} parent={this}
                    onSubmit={(value) => {
                      this.props.dispatch({
                        type: actionTypes.CHANGE_PHONE,
                        user_id: _id,
                        new_phone: value
                      });
                      this.setState({ phone: value, isLoading: true });
                    }}
                  />
                  <ProfileEdit type="address" title="Address" content={address} parent={this}
                    onSubmit={(value) => {
                      this.props.dispatch({
                        type: actionTypes.CHANGE_ADDRESS,
                        user_id: _id,
                        new_address: value
                      });
                      this.setState({ address: value, isLoading: true });
                    }}
                  />
                  <Text style={styles.pwdText}>Password</Text>
                  <View style={styles.edit_view}>
                    <RoundTextInput
                      style={styles.pwdInput}
                      placeholder="Current Password"
                      placeholderTextColor={Colors.greenColor}
                      type="password"
                      prefixIcon="password"
                      returnKeyType="done"
                      showPassword={true}
                      value={this.state.currentPassword}
                      errorMessage={this.state.currentPwdError}
                      onRefInput={(input) => { this.currentPwdInput = input }}
                      onChangeText={(text) => this.setState({currentPassword: text, currentPwdError: ''})}
                      onSubmitEditing={() => { this.newPwdInput.focus() }}
                    />
                    <RoundTextInput
                      style={styles.pwdInput}
                      placeholder="New Password"
                      placeholderTextColor={Colors.greenColor}
                      type="password"
                      prefixIcon="password"
                      returnKeyType="done"
                      showPassword={true}
                      value={this.state.newPassword}
                      errorMessage={this.state.newPwdError}
                      onRefInput={(input) => { this.newPwdInput = input }}
                      onChangeText={(text) => this.setState({newPassword: text, newPwdError: ''})}
                      onSubmitEditing={() => { this.confirmPwdInput.focus() }}
                    />
                    <RoundTextInput
                      style={styles.pwdInput}
                      placeholder="Confirm Password"
                      placeholderTextColor={Colors.greenColor}
                      type="password"
                      prefixIcon="password"
                      returnKeyType="done"
                      showPassword={true}
                      value={this.state.confirmPassword}
                      errorMessage={this.state.confirmPwdError}
                      onRefInput={(input) => { this.confirmPwdInput = input }}
                      onChangeText={(text) => this.setState({confirmPassword: text, confirmPwdError: ''})}
                      onSubmitEditing={this.onChangePassword}
                    />
                    <RoundButton
                      title="CHANGE PASSWORD"
                      theme="redDark"
                      style={{width: '100%'}}
                      onPress={this.onChangePassword}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        <BottomBar eleType="profile" doNavigate={this.props.navigation.navigate}/>
        <Toast ref={ref => (this.toast = ref)}/>
        { this.state.isLoading && <LoadingOverlay /> }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: Fonts.latoBold,
  },
  profileText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.blueColor,
  },
  fullname: {
    fontSize: 24,
    color: Colors.blueColor,
    fontWeight: 'bold',

  },
  topView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  pwdText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  edit_view: {
    marginTop: 10,
    marginBottom: 10,
  },
  pwdInput: {
    flex: 1,
  },
  avatarSaveView: {
    flex: 1,
    flexDirection: 'row',
  },
  backArrow: {
    position: 'absolute',
    ...ifIphoneX({
      top: 50,
    },{
      top: 20,
    }),
    right: 10,
    zIndex:2
  }
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    changedAvatar: state.user.changedAvatar,
    changeAvatarStatus: state.user.changeAvatarStatus,
    changePasswordStatus: state.user.changePasswordStatus,
    changeEmailStatus: state.user.changeEmailStatus,
    changePhoneStatus: state.user.changePhoneStatus,
    changeAddressStatus: state.user.changeAddressStatus,
    errorMessage: state.user.errorMessage,
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);
