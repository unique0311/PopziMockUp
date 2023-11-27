import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Keyboard
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import SexSelect from '../components/SignUp/SexSelect';
import RegisterPage from '../components/SignUp/RegisterPage'
import RoundButton from '../components/RoundButton'
import LoadingOverlay from '../components/LoadingOverlay'
import CheckBox from '../components/CheckBox';
import Label from '../components/Label';
import Button from '../components/Button';

import { TOAST_SHOW_TIME, Status, PASSWORD_MIN_LENGTH } from '../constants.js'
import { validateEmail, getOnlyAlphabetLetters } from '../functions'
import actionTypes from '../actions/actionTypes';
import * as Storage from '../services/Storage'

import Messages from '../theme/Messages'
import Fonts from '../theme/Fonts'
import Colors from '../theme/Colors';

class SignUpScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super()
    this.state = {
      isLoading: false,
      user: {
        avatar: '',
        avatarFile: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        currentLat: 0,
        currentLng: 0,
        gender: 0, // 0: male,  1: female
        firstNameError: null,
        lastNameError: null,
        emailError: null,
        phoneError: null,
        addressError: null,
        passwordError: null,
        confirmPasswordError: null,
        agreeTerms: false,
        termsError: null,
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {

    // Register User.
    if (prevProps.registerUserStatus != this.props.registerUserStatus) {
      if (this.props.registerUserStatus == Status.SUCCESS) {
        this.registerUserSuccess();
      }
      else if (this.props.registerUserStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }
    }
  }


  onBack() {
    this.props.navigation.goBack();
  }

  onMoveHome() {
    this.props.navigation.navigate("Capture");
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Capture'}]
    });
  }

  onChangeUser(key, value) {
    var user = this.state.user;
    if (key == "avatar") {
      user.avatar = value;
    }
    else if (key == "avatarFile") {
      user.avatarFile = value;
    }
    else if (key == "firstName") {
      user.firstName = getOnlyAlphabetLetters(value);
      user.firstNameError = "";
    } else if (key == "lastName") {
      user.lastName = getOnlyAlphabetLetters(value);
      user.lastNameError = "";
    } else if (key == "email") {
      user.email = value;
      if (value && value != "" && validateEmail(value)) {
        user.emailError = "";
      }
    } else if (key == "phone") {
      user.phone = value;
      user.phoneError = "";
    } else if (key == "address") {
      user.address = value;
      user.addressError = "";
    } else if (key == "password") {
      user.password = value;
      user.passwordError = "";
    } else if (key == "confirmPassword") {
      user.confirmPassword = value;
      user.confirmPasswordError = "";
    } else if (key == "gender") {
      user.gender = value;
    }

    this.setState({user: user});
  }

  componentDidMount() {
    var { user } = this.props.route.params;
    if (user) {
      const existingUser = this.state.user;      
      if (user.socialId) {
        existingUser.socialId = user.socialId;
      }

      if (user.socialType) {
        existingUser.socialType = user.socialType;
      }

      if (user.firstName) {
        existingUser.firstName = user.firstName;
      }

      if (user.lastName) {
        existingUser.lastName = user.lastName;
      }

      if (user.email) {
        existingUser.email = user.email;
      }

      if (user.avatar) {
        existingUser.avatar = user.avatar;
      }

      this.setState({user: existingUser});
    }

  }

  onRegister() {
    Keyboard.dismiss();

    var isValid = true;
    const user = this.state.user;
    if (user.firstName == null || user.firstName.length == 0) {
      user.firstNameError = Messages.InvalidFirstname;
      isValid = false;
    }

    if (user.lastName == null || user.lastName.length == 0) {
      user.lastNameError = Messages.InvalidLastname;
      isValid = false;
    }

    if (user.email == null || user.email.length == 0 || !validateEmail(user.email)) {
      user.emailError = Messages.InvalidEmail;
      isValid = false;
    }

    if (user.phone == null || user.phone.length == 0) {
      user.phoneError = Messages.InvalidPhone;
      isValid = false;
    }

    if (user.address == null || user.address.length == 0) {
      user.addressError = Messages.InvalidAddress;
      isValid = false;
    }

    if (user.socialId == null) {
      if (user.password == null || user.password.length == 0) {
        user.passwordError = Messages.InvalidPassword;
        isValid = false;
      }
      else if (user.password.length < PASSWORD_MIN_LENGTH) {
        user.passwordError = Messages.ShortPasswordError;
        isValid = false;
      }

      if (user.confirmPassword == null || user.confirmPassword.length == 0) {
        user.confirmPasswordError = Messages.InvalidConfirmPassword;
        isValid = false;
      } else if (user.confirmPassword != user.password) {
        user.confirmPasswordError = Messages.InvalidPasswordNotMatch;
        isValid = false;
      }
    }

    if (!this.state.agreeTerms) {
      this.setState({termsError: Messages.InvalidTerms});
      isValid = false;
    }

    if (isValid) {
      this.setState({isLoading: true}, () => {
        this.registerUser();
      });
    } else {
      this.setState({user: user});
    }
  }

  registerUser() {
    var { user } = this.state;
    this.props.dispatch({
      type: actionTypes.REGISTER_USER,
      user: user,
    });
  }

  async registerUserSuccess() {
    this.setState({isLoading: false});
    Storage.USERID.set(this.props.currentUser._id);
    this.onMoveHome();
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
  onTerms() {
    Keyboard.dismiss();
    this.props.navigation.navigate('Terms');
  }

  render() {
    const {
      user,
      termsError,
    } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: Colors.greenColor}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.createAccount}>CREATE A NEW ACCOUNT</Text>
                <View style={styles.formView}>
                  <RegisterPage
                    user={user}
                    onTerms={() => this.onTerms()}
                    onChangeUser={(key, value) => this.onChangeUser(key, value)}
                    onRegister={() => this.onRegister()}
                  />
                  <View style={styles.gender}>
                    <Text>GENDER</Text>
                    <SexSelect selected={user.gender} onChange={item => {
                      let temp = {...user};
                      temp.gender = item;
                      this.setState({user: temp});
                    }}/>
                  </View>
                  <View style={styles.viewMiddle}>
                    <View style={styles.viewTerms}>
                      <CheckBox 
                        value={this.state.agreeTerms} 
                        onChange={(selected) => this.setState({agreeTerms: selected, termsError: ''})} 
                      />
                      <Label title="I agree to the " color={Colors.blackColor} style={{marginLeft: 22}}/>
                      <Button title="Privacy Policy" type="text" color={Colors.blackBrightColor} onPress={() => this.onTerms()}/>
                    </View>          
                    {
                      (termsError && termsError.length > 0) 
                      ? <Text style={[styles.errorText, {marginLeft: 20}]}>{termsError}</Text>
                      : null
                    }
                    <RoundButton 
                      title="Register" 
                      theme="main" 
                      style={styles.registerButton} 
                      onPress={() => this.onRegister()} />
                  </View>
                  <View style={styles.viewBottom}>
                    <RoundButton
                      title="NEXT"
                      theme="black"
                      style={styles.registerButton}
                      onPress={() => this.onRegister()} />
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
            <Toast ref={ref => (this.toast = ref)}/>
            {
              this.state.isLoading
              ? <LoadingOverlay />
              : null
            }
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: Fonts.WorkSans
  },
  createAccount: {
    fontSize: 20,
    fontFamily: Fonts.latoBold,
    marginTop: 50,
    marginBottom: 20,
  },
  formView: {
    width: '100%',
		paddingLeft: 25,
		paddingRight: 25,
		paddingBottom: 20,
  },
  viewTerms: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 18,
  },
  viewMiddle: {
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  viewBottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  registerButton: {
    marginTop: 20,
    width: '90%'
  },
  gender: {
    marginLeft: 5,
    marginTop: 10,
    fontFamily: Fonts.wsSemiBold
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontStyle: 'italic',
    color: '#cf0000',
    fontSize: 11,
    marginTop: 5,
    marginBottom: 10,
  },
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    errorMessage: state.user.errorMessage,
    registerUserStatus: state.user.registerUserStatus,
    // checkEmailStatus: state.user.checkEmailStatus,
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen);
