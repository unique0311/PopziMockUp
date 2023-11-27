import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Toast from 'react-native-easy-toast';

import RoundButton from '../components/RoundButton';
import RoundTextInput from '../components/RoundTextInput';
import LoadingOverlay from '../components/LoadingOverlay';
import BlueBar from '../components/SignUp/BlueBar';

import actionTypes from '../actions/actionTypes';
import {isValidEmail} from '../functions';
import {Status, TOAST_SHOW_TIME} from '../constants';

import Messages from '../theme/Messages';
import Colors from '../theme/Colors';

class ForgotPasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: '',
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.forgotPasswordStatus != this.props.forgotPasswordStatus) {
      if (this.props.forgotPasswordStatus == Status.SUCCESS) {
        this.forgotPasswordSuccess();
      } else if (this.props.forgotPasswordStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }

  showResultMessage(message) {
    Alert.alert(
      '',
      message,
      [
        {text: 'OK', onPress: () => {
          this.props.navigation.navigate('VerificationCode', {email: this.state.email});
        }},
      ]
    );
  }

  onResetPassword() {
    Keyboard.dismiss();

    let email = this.state.email;

    var isValid = true;
    if (email == null || email.length <= 0 || !isValidEmail(email)) {
      this.setState({emailError: Messages.InvalidEmail});
      isValid = false;
    }

    if (isValid) {
      this.setState({isLoading: true}, () => {
        this.props.dispatch({
          type: actionTypes.FORGOT_PASSWORD,
          email: email,
        });
      });
    }
  }

  forgotPasswordSuccess() {
    this.setState({isLoading: false});
    let message = this.props.resultMessage;
    this.showResultMessage(message);
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
                  <BlueBar title="Enter your email address and we will send you a verification code to reset your password."/>
                  <View style={styles.contentView}>
                    <RoundTextInput
                      placeholder="Email"
                      type="email"
                      prefixIcon="email"
                      placeholderTextColor="#939393"
                      value={this.state.email}
                      errorMessage={this.state.emailError}
                      returnKeyType="done"
                      onSubmitEditing={() => { this.onResetPassword() }}
                      onChangeText={(text) => this.setState({email: text, emailError: null})}
                    />
                    <RoundButton
                      title="SUBMIT"
                      theme="red"
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
        { this.state.isLoading && <LoadingOverlay /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: Colors.greenColor,
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
    forgotPasswordStatus: state.user.forgotPasswordStatus,
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPasswordScreen);
