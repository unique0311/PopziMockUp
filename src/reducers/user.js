import { createReducer } from 'reduxsauce';
import Types from '../actions/actionTypes';
import { Status } from '../constants';

export const initialState = {
  currentUser: null,
  needToSignUp: false,
  errorMessage: '',
  resultMessage: '',
  instagramUserProfile: null,

  loginUserStatus: Status.NONE,
  loginWithSocialStatus: Status.NONE,
  checkEmailStatus: Status.NONE,
  registerUserStatus: Status.NONE,
  forgotPasswordStatus: Status.NONE,
  verifyCodePasswordStatus: Status.NONE,
  resetPasswordStatus: Status.NONE,
  changeAvatarStatus: Status.NONE,
  changePasswordStatus: Status.NONE,
  changeEmailStatus: Status.NONE,
  changePhoneStatus: Status.NONE,
  changeAddressStatus: Status.NONE,
  getUserStatus: Status.NONE,
  restoreUserStatus: Status.NONE,
  getCurrentUserStatus: Status.NONE,
  getInstagramUserProfileStatus: Status.NONE,

  // addShippingAddressStatus: Status.NONE,
  // editShippingAddressStatus: Status.NONE,
  // removeShippingAddressStatus: Status.NONE,
  // changeActiveShippingAddressStatus: Status.NONE,

  // addPaymentStatus: Status.NONE,
  // editPaymentStatus: Status.NONE,
  // removePaymentStatus: Status.NONE,

  // withdrawWithPaypalStatus: Status.NONE,
  // withdrawWithBankStatus: Status.NONE,
};

/////////////////////////////////////////////////////
/////////////////////// Login ///////////////////////
/////////////////////////////////////////////////////
const loginUserRequest = (state) => ({
  ...state,
  loginUserStatus: Status.REQUEST,
});

const loginUserSuccess = (state, action) => ({
  ...state,
  currentUser: action.payload,
  loginUserStatus: Status.SUCCESS,
});

const loginUserFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
 loginUserStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
//////////////// Login With Social //////////////////
/////////////////////////////////////////////////////
const loginWithSocialRequest = (state) => ({
  ...state,
  loginWithSocialStatus: Status.REQUEST,
});

const loginWithSocialSuccess = (state, action) => ({
  ...state,
  currentUser: action.payload.user,
  needToSignUp: action.payload.needToSignUp ? action.payload.needToSignUp : false,
  loginWithSocialStatus: Status.SUCCESS,
});

const loginWithSocialFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
 loginWithSocialStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
////////////////// Restore User /////////////////////
/////////////////////////////////////////////////////
const restoreUserRequest = (state) => ({
  ...state,
  restoreUserStatus: Status.REQUEST,
});

const restoreUserSuccess = (state, action) => ({
  ...state,
  currentUser: action.payload,
  restoreUserStatus: Status.SUCCESS,
});

const restoreUserFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  restoreUserStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
////////////////// Check Email //////////////////////
/////////////////////////////////////////////////////
const checkEmailRequest = (state) => ({
  ...state,
  checkEmailStatus: Status.REQUEST,
});

const checkEmailSuccess = (state, action) => ({
  ...state,
  checkEmailStatus: Status.SUCCESS,
});

const checkEmailFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  checkEmailStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
//////////////// Register User //////////////////
/////////////////////////////////////////////////////
const registerUserRequest = (state) => ({
  ...state,
  registerUserStatus: Status.REQUEST,
});

const registerUserSuccess = (state, action) => ({
  ...state,
  currentUser: action.payload,
  registerUserStatus: Status.SUCCESS,
});

const registerUserFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  registerUserStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
///////////////// Forgot Password ///////////////////
/////////////////////////////////////////////////////
const forgotPasswordRequest = (state) => ({
  ...state,
  forgotPasswordStatus: Status.REQUEST,
});

const forgotPasswordSuccess = (state, action) => ({
  ...state,
  resultMessage: action.payload,
  forgotPasswordStatus: Status.SUCCESS,
});

const forgotPasswordFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  forgotPasswordStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
/////////////// Verify Code Password ////////////////
/////////////////////////////////////////////////////
const verifyCodePasswordRequest = (state) => ({
  ...state,
  verifyCodePasswordStatus: Status.REQUEST,
});

const verifyCodePasswordSuccess = (state, action) => ({
  ...state,
  resultMessage: action.payload,
  verifyCodePasswordStatus: Status.SUCCESS,
});

const verifyCodePasswordFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  verifyCodePasswordStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
/////////////////// Reset Password //////////////////
/////////////////////////////////////////////////////
const resetPasswordRequest = (state) => ({
  ...state,
  resetPasswordStatus: Status.REQUEST,
});

const resetPasswordSuccess = (state, action) => ({
  ...state,
  resultMessage: action.payload,
  resetPasswordStatus: Status.SUCCESS,
});

const resetPasswordFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  resetPasswordStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
///////////////// Change Avatar /////////////////////
/////////////////////////////////////////////////////
const changeAvatarRequest = (state) => ({
  ...state,
  changeAvatarStatus: Status.REQUEST,
});

const changeAvatarSuccess = (state, action) => ({
  ...state,
  resultMessage: action.payload,
  changeAvatarStatus: Status.SUCCESS,
});

const changeAvatarFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  changeAvatarStatus: Status.FAILURE,
});


/////////////////////////////////////////////////////
///////////////// Change Password ///////////////////
/////////////////////////////////////////////////////
const changePasswordRequest = (state) => ({
  ...state,
  changePasswordStatus: Status.REQUEST,
});

const changePasswordSuccess = (state, action) => ({
  ...state,
  resultMessage: action.payload,
  changePasswordStatus: Status.SUCCESS,
});

const changePasswordFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  changePasswordStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
///////////////// Change Email ///////////////////
/////////////////////////////////////////////////////
const changeEmailRequest = (state) => ({
  ...state,
  changeEmailStatus: Status.REQUEST,
});

const changeEmailSuccess = (state, action) => ({
  ...state,
  resultMessage: action.payload,
  changeEmailStatus: Status.SUCCESS,
});

const changeEmailFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  changeEmailStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
///////////////// Change Phone ///////////////////
/////////////////////////////////////////////////////
const changePhoneRequest = (state) => ({
  ...state,
  changePhoneStatus: Status.REQUEST,
});

const changePhoneSuccess = (state, action) => ({
  ...state,
  resultMessage: action.payload,
  changePhoneStatus: Status.SUCCESS,
});

const changePhoneFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  changePhoneStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
///////////////// Change Address ///////////////////
/////////////////////////////////////////////////////
const changeAddressRequest = (state) => ({
  ...state,
  changeAddressStatus: Status.REQUEST,
});

const changeAddressSuccess = (state, action) => ({
  ...state,
  resultMessage: action.payload,
  changeAddressStatus: Status.SUCCESS,
});

const changeAddressFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  changeAddressStatus: Status.FAILURE,
});

/////////////////////////////////////////////////////
////////////////// Get User /////////////////////////
/////////////////////////////////////////////////////
const getUserRequest = (state) => ({
  ...state,
  getUserStatus: Status.REQUEST,
});

const getUserSuccess = (state, action) => ({
    ...state,
    getUserStatus: Status.SUCCESS,
    currentUser: action.payload.user
});

const getUserFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  getUserStatus: Status.FAILURE,
});


/////////////////////////////////////////////////////
/////////////// Get Current User ////////////////////
/////////////////////////////////////////////////////
const getCurrentUserRequest = (state) => ({
  ...state,
  getCurrentUserStatus: Status.REQUEST,
});

const getCurrentUserSuccess = (state, action) => ({
  ...state,
  getCurrentUserStatus: Status.SUCCESS,
});

const getCurrentUserFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  getCurrentUserStatus: Status.FAILURE,
});

/*
***** Set Current User. *****
*/

const setCurrentUser = (state, action) => ({
  ...state,
  currentUser: action.user,
});

/////////////////////////////////////////////////////
////////// Get Instagram User Profile ///////////////
/////////////////////////////////////////////////////
const getInstagramUserProfileRequest = (state) => ({
  ...state,
  getInstagramUserProfileStatus: Status.REQUEST,
});

const getInstagramUserProfileSuccess = (state, action) => ({
  ...state,
  instagramUserProfile: action.payload,
  getInstagramUserProfileStatus: Status.SUCCESS,
});

const getInstagramUserProfileFailure = (state, action) => ({
  ...state,
  errorMessage: action.error,
  getInstagramUserProfileStatus: Status.FAILURE,
});

const actionHandlers = {
  [Types.LOGIN_REQUEST]: loginUserRequest,
  [Types.LOGIN_SUCCESS]: loginUserSuccess,
  [Types.LOGIN_FAILURE]: loginUserFailure,

  [Types.LOGIN_WITH_SOCIAL_REQUEST]: loginWithSocialRequest,
  [Types.LOGIN_WITH_SOCIAL_SUCCESS]: loginWithSocialSuccess,
  [Types.LOGIN_WITH_SOCIAL_FAILURE]: loginWithSocialFailure,

  [Types.RESTORE_USER_REQUEST]: restoreUserRequest,
  [Types.RESTORE_USER_SUCCESS]: restoreUserSuccess,
  [Types.RESTORE_USER_FAILURE]: restoreUserFailure,

  [Types.REGISTER_USER_REQUEST]: registerUserRequest,
  [Types.REGISTER_USER_SUCCESS]: registerUserSuccess,
  [Types.REGISTER_USER_FAILURE]: registerUserFailure,

  [Types.FORGOT_PASSWORD_REQUEST]: forgotPasswordRequest,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.FORGOT_PASSWORD_FAILURE]: forgotPasswordFailure,

  [Types.VERIFY_CODE_PASSWORD_REQUEST]: verifyCodePasswordRequest,
  [Types.VERIFY_CODE_PASSWORD_SUCCESS]: verifyCodePasswordSuccess,
  [Types.VERIFY_CODE_PASSWORD_FAILURE]: verifyCodePasswordFailure,

  [Types.CHANGE_AVATAR_REQUEST]: changeAvatarRequest,
  [Types.CHANGE_AVATAR_SUCCESS]: changeAvatarSuccess,
  [Types.CHANGE_AVATAR_FAILURE]: changeAvatarFailure,

  [Types.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
  [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [Types.CHANGE_PASSWORD_FAILURE]: changePasswordFailure,

  [Types.CHANGE_EMAIL_REQUEST]: changeEmailRequest,
  [Types.CHANGE_EMAIL_SUCCESS]: changeEmailSuccess,
  [Types.CHANGE_EMAIL_FAILURE]: changeEmailFailure,

  [Types.CHANGE_PHONE_REQUEST]: changePhoneRequest,
  [Types.CHANGE_PHONE_SUCCESS]: changePhoneSuccess,
  [Types.CHANGE_PHONE_FAILURE]: changePhoneFailure,

  [Types.CHANGE_ADDRESS_REQUEST]: changeAddressRequest,
  [Types.CHANGE_ADDRESS_SUCCESS]: changeAddressSuccess,
  [Types.CHANGE_ADDRESS_FAILURE]: changeAddressFailure,

  [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,

  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,

  [Types.GET_CURRENT_USER_REQUEST]: getCurrentUserRequest,
  [Types.GET_CURRENT_USER_SUCCESS]: getCurrentUserSuccess,
  [Types.GET_CURRENT_USER_FAILURE]: getCurrentUserFailure,

  [Types.CHECK_EMAIL_REQUEST]: checkEmailRequest,
  [Types.CHECK_EMAIL_SUCCESS]: checkEmailSuccess,
  [Types.CHECK_EMAIL_FAILURE]: checkEmailFailure,

  [Types.GET_INSTAGRAM_USER_PROFILE_REQUEST]: getInstagramUserProfileRequest,
  [Types.GET_INSTAGRAM_USER_PROFILE_SUCCESS]: getInstagramUserProfileSuccess,
  [Types.GET_CURRENT_USER_FAILURE]: getInstagramUserProfileFailure,

  [Types.SET_CURRENT_USER]: setCurrentUser,
};

export default createReducer(initialState, actionHandlers);
