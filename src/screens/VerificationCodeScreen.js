import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Toast, {DURATION} from 'react-native-easy-toast'

import RoundButton from '../components/RoundButton'
import BlueBar from '../components/SignUp/BlueBar'
import RoundTextInput from '../components/RoundTextInput'
import LoadingOverlay from '../components/LoadingOverlay'

import actionTypes from '../actions/actionTypes';
import { TOAST_SHOW_TIME, Status } from '../constants.js'

import Messages from '../theme/Messages'
import Colors from '../theme/Colors';

class VerificationCodeScreen extends Component {
  constructor() {
    super()
    this.state = {
      code: '',
      codeError: '',
      isLoading: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.verifyCodePasswordStatus != this.props.verifyCodePasswordStatus) {
      if (this.props.verifyCodePasswordStatus == Status.SUCCESS) {
        this.verifyCodePasswordSuccess();
      } else if (this.props.verifyCodePasswordStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  moveResetPassword() {
    const { email } = this.props.route.params;
    this.props.navigation.navigate('ResetNewPassword', {email: email});
  }

  onVerify() {
    Keyboard.dismiss();

    const { email } = this.props.route.params;
    let code = this.state.code;

    var isValid = true;
    if (code == null || code.length <= 0) {
      this.setState({codeError: Messages.InvalidVerifyCode});
      isValid = false;
    }

    if (isValid) {
      this.setState({isLoading: true}, () => {
        this.props.dispatch({
          type: actionTypes.VERIFY_CODE_PASSWORD,
          email: email,
          code: code
        });
      });
    }
  }

  verifyCodePasswordSuccess() {
    this.setState({isLoading: false});
    this.moveResetPassword();
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
      <View style={{flex: 1, backgroundColor: Colors.greenColor}}>
        <SafeAreaInsetsContext.Consumer>
          {insets =>
            <View style={{flex: 1, paddingTop: insets.top }} >
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                  <BlueBar title="We have sent you an access code via Email for email address verification."/>
                  <View style={styles.contentView}>
                    <RoundTextInput
                      placeholder="Verification Code"
                      type="number"
                      placeholderTextColor="#939393"
                      value={this.state.code}
                      errorMessage={this.state.codeError}
                      returnKeyType="done"
                      onChangeText={(text) => this.setState({code: text, codeError: null})}
                      onSubmitEditing={() => { this.onVerify() }}
                    />
                     <RoundButton
                      title="SUBMIT"
                      theme="red"
                      style={{width: '100%'}}
                      onPress={() => {
                        this.onVerify()
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
    marginTop: 30,
    backgroundColor: Colors.bgFirstColor
  },

  contentView: {
    paddingHorizontal: 30,
  },

  registerButton: {
    width: '100%',
    marginTop: 10,
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
    verifyCodePasswordStatus: state.user.verifyCodePasswordStatus,
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(VerificationCodeScreen);
