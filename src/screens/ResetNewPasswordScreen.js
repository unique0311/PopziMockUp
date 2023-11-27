import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Toast from 'react-native-easy-toast'

import RoundButton from '../components/RoundButton'
import RoundTextInput from '../components/RoundTextInput'
import LoadingOverlay from '../components/LoadingOverlay'
import BlueBar from '../components/SignUp/BlueBar';

import { TOAST_SHOW_TIME, Status, PASSWORD_MIN_LENGTH } from '../constants.js'
import actionTypes from '../actions/actionTypes';

import Messages from '../theme/Messages'
import Colors from '../theme/Colors';

class ResetNewPasswordScreen extends Component {
  constructor() {
    super()
    this.state = {
      newPassword: '',
      newPasswordConfirm: '',
      passwordError: '',
      passwordConfirmError: '',
      isLoading: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resetPasswordStatus != this.props.resetPasswordStatus) {
      if (this.props.resetPasswordStatus == Status.SUCCESS) {
        this.resetPasswordSuccess();
      } else if (this.props.resetPasswordStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  onResetPassword() {
    Keyboard.dismiss();

    const { email } = this.props.route.params;
    let newPassword = this.state.newPassword;
    let newPasswordConfirm = this.state.newPasswordConfirm;

    var isValid = true;
    if (newPassword == null || newPassword.length <= 0) {
      this.setState({passwordError: Messages.InvalidPassword});
      isValid = false;
    } else if (newPassword.length < PASSWORD_MIN_LENGTH) {
      this.setState({passwordError: Messages.ShortPasswordError});
      isValid = false;
    }

    if (newPasswordConfirm == null || newPasswordConfirm.length <= 0) {
      this.setState({passwordConfirmError: Messages.InvalidConfirmPassword});
      isValid = false;
    } else if (newPassword != newPasswordConfirm) {
      this.setState({passwordConfirmError: Messages.InvalidPasswordNotMatch});
      isValid = false;
    }

    if (isValid) {
      this.setState({isLoading: true}, () => {
        this.props.dispatch({
          type: actionTypes.RESET_PASSWORD,
          email: email,
          password: newPassword
        });
      });
    }
  }

  resetPasswordSuccess() {
    this.setState({isLoading: false});
    this.props.navigation.navigate('ResetPwdSuccess');
  }

  onFailure(message) {
    this.setState({isLoading: false});
    if (message && message.length > 0) {
      this.toast.show(message, TOAST_SHOW_TIME);
    }
    else {
      this.toast.show(Messages.NetWorkError, TOAST_SHOW_TIME);
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <SafeAreaInsetsContext.Consumer>
          {insets =>
            <View style={{flex: 1, paddingTop: insets.top }} >
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                  <BlueBar title="Create a new password and Please never share it with anyone for safe use."/>
                  <View style={styles.contentView}>
                    <RoundTextInput
                      placeholder="New Password"
                      type="password"
                      placeholderTextColor={Colors.grayColor}
                      value={this.state.newPassword}
                      errorMessage={this.state.passwordError}
                      returnKeyType="done"
                      onSubmitEditing={() => { this.confirmPasswordInput.focus() }}
                      onChangeText={(text) => this.setState({newPassword: text, passwordError: null})}
                      inlineImage="icon_out_pwd"
                    />
                    <RoundTextInput
                      placeholder="Confirm New Password"
                      type="password"
                      placeholderTextColor={Colors.grayColor}
                      value={this.state.newPasswordConfirm}
                      errorMessage={this.state.passwordConfirmError}
                      returnKeyType="done"
                      onRefInput={(input) => { this.confirmPasswordInput = input }}
                      onSubmitEditing={() => { this.onResetPassword() }}
                      onChangeText={(text) => this.setState({newPasswordConfirm: text, passwordConfirmError: null})}
                      inlineImage="icon_out_pwd"
                    />
                    <RoundButton
                      title="SUBMIT"
                      theme="redDark"
                      style={{width: '100%'}}
                      onPress={() => {
                        this.onResetPassword()
                      }}
                    />
                  </View>
                  </View>
                </TouchableWithoutFeedback>
            </View>
          }
        </SafeAreaInsetsContext.Consumer>
        <Toast ref={ref => (this.toast = ref)}/>
        {
          this.state.isLoading && <LoadingOverlay />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.greenColor
  },

  contentView: {
    padding: 30,
  },

  registerButton: {
    marginTop: 20,
    width: '100%'
  },
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    resultMessage: state.user.resultMessage,
    errorMessage: state.user.errorMessage,
    resetPasswordStatus: state.user.resetPasswordStatus,
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetNewPasswordScreen);
