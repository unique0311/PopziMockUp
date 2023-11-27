import {
  put, call, takeLatest
} from 'redux-saga/effects';
import Types from '../actions/actionTypes';
import api from '../api';
import Messages from '../theme/Messages'

const {
  loginUser,
  loginWithSocial,
  registerUser,
  checkEmail,
  forgotPassword,
  verifyCodePassword,
  changeAvatar,
  changePassword,
  changeEmail,
  changePhone,
  changeAddress,
  getUser,
  resetPassword,
  getInstagramUserProfile,
} = api;

function* GetCurrentUser(action) {
  yield put({ type: Types.GET_CURRENT_USER_REQUEST });
  try {
    yield put({ type: Types.GET_CURRENT_USER_SUCCESS });
  } catch (error) {
    yield put({ type: Types.GET_CURRENT_USER_FAILURE, error: Messages.NetWorkError });
  }
}

function* LoginUser(action) {
  yield put({ type: Types.LOGIN_REQUEST });
  try {
    const res = yield call(loginUser, action.email, action.password);
    if (res.result) {
      yield put({ type: Types.LOGIN_SUCCESS, payload: res.user });
    } else {
      yield put({ type: Types.LOGIN_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.LOGIN_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* LoginWithSocial(action) {
  yield put({ type: Types.LOGIN_WITH_SOCIAL_REQUEST });
  try {
    const res = yield call(loginWithSocial, action.user, action.player_id, action.lat, action.lng);
    if (res.result) {
      yield put({ type: Types.LOGIN_WITH_SOCIAL_SUCCESS, payload: res });
    } else {
      yield put({ type: Types.LOGIN_WITH_SOCIAL_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.LOGIN_WITH_SOCIAL_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* RestoreUser(action) {
  yield put({ type: Types.RESTORE_USER_REQUEST });
  try {
    const res = yield call(getUser, action.user_id);
    if (res.result) {
      yield put({ type: Types.RESTORE_USER_SUCCESS, payload: res.user });
    } else {
      yield put({ type: Types.RESTORE_USER_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.RESTORE_USER_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* CheckEmail(action) {
  yield put({ type: Types.CHECK_EMAIL_REQUEST });
  try {
    const res = yield call(checkEmail, action.email);
    if (res.result) {
      yield put({ type: Types.CHECK_EMAIL_SUCCESS, payload: res });
    } else {
      yield put({ type: Types.CHECK_EMAIL_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.CHECK_EMAIL_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* RegisterUser(action) {
  yield put({ type: Types.REGISTER_USER_REQUEST });
  try {
    const res = yield call(registerUser, action.user);
    if (res.result) {
      yield put({ type: Types.REGISTER_USER_SUCCESS, payload: res.user });
    } else {
      yield put({ type: Types.REGISTER_USER_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.REGISTER_USER_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* ForgotPassword(action) {
  yield put({ type: Types.FORGOT_PASSWORD_REQUEST });
  try {
    const res = yield call(forgotPassword, action.email);
    if (res.result) {
      yield put({ type: Types.FORGOT_PASSWORD_SUCCESS, payload: res.message });
    } else {
      yield put({ type: Types.FORGOT_PASSWORD_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.FORGOT_PASSWORD_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* VerifyCodePassword(action) {
  yield put({ type: Types.VERIFY_CODE_PASSWORD_REQUEST });
  try {
    const res = yield call(verifyCodePassword, action.email, action.code);
    if (res.result) {
      yield put({ type: Types.VERIFY_CODE_PASSWORD_SUCCESS, payload: res.message });
    } else {
      yield put({ type: Types.VERIFY_CODE_PASSWORD_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.VERIFY_CODE_PASSWORD_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* ResetPassword(action) {
  yield put({ type: Types.RESET_PASSWORD_REQUEST });
  try {
    const res = yield call(resetPassword, action.email, action.password);
    if (res.result) {
      yield put({ type: Types.RESET_PASSWORD_SUCCESS, payload: res.message });
    } else {
      yield put({ type: Types.RESET_PASSWORD_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.RESET_PASSWORD_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}


function* ChangeAvatar(action) {
  yield put({ type: Types.CHANGE_AVATAR_REQUEST });
  try {
    const res = yield call(changeAvatar, action.user_id, action.new_avatar);
    if (res.result) {
      yield put({ type: Types.CHANGE_AVATAR_SUCCESS, payload: res.message });
    } else {
      yield put({ type: Types.CHANGE_AVATAR_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.CHANGE_AVATAR_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* ChangePassword(action) {
  yield put({ type: Types.CHANGE_PASSWORD_REQUEST });
  try {
    const res = yield call(changePassword, action.user_id, action.old_password, action.new_password);
    if (res.result) {
      yield put({ type: Types.CHANGE_PASSWORD_SUCCESS, payload: res.message });
    } else {
      yield put({ type: Types.CHANGE_PASSWORD_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.CHANGE_PASSWORD_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* ChangeEmail(action) {
  yield put({ type: Types.CHANGE_EMAIL_REQUEST });
  try {
    const res = yield call(changeEmail, action.user_id, action.new_email);
    if (res.result) {
      yield put({ type: Types.CHANGE_EMAIL_SUCCESS, payload: res.message });
    } else {
      yield put({ type: Types.CHANGE_EMAIL_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.CHANGE_EMAIL_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* ChangePhone(action) {
  yield put({ type: Types.CHANGE_PHONE_REQUEST });
  try {
    const res = yield call(changePhone, action.user_id, action.new_phone);
    if (res.result) {
      yield put({ type: Types.CHANGE_PHONE_SUCCESS, payload: res.message });
    } else {
      yield put({ type: Types.CHANGE_PHONE_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.CHANGE_PHONE_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* ChangeAddress(action) {
  yield put({ type: Types.CHANGE_ADDRESS_REQUEST });
  try {
    const res = yield call(changeAddress, action.user_id, action.new_address);
    if (res.result) {
      yield put({ type: Types.CHANGE_ADDRESS_SUCCESS, payload: res.message });
    } else {
      yield put({ type: Types.CHANGE_ADDRESS_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.CHANGE_ADDRESS_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* GetUser(action) {
  yield put({ type: Types.GET_USER_REQUEST });
  try {
    const res = yield call(getUser, action.user_id);
    if (res.result) {
      yield put({ type: Types.GET_USER_SUCCESS, payload: res});
    } else {
      yield put({ type: Types.GET_USER_FAILURE, error: res.error });
    }
  } catch (error) {
    yield put({ type: Types.GET_USER_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

function* GetInstagramUserProfile(action) {
  yield put({ type: Types.GET_INSTAGRAM_USER_PROFILE_REQUEST });
  try {
    const res = yield call(getInstagramUserProfile, action.user_id, action.access_token);
    if (res) {
      yield put({ type: Types.GET_INSTAGRAM_USER_PROFILE_SUCCESS, payload: res});
    } else {
      yield put({ type: Types.GET_INSTAGRAM_USER_PROFILE_FAILURE, error: "Can't get instagram user profile" });
    }
  } catch (error) {
    yield put({ type: Types.GET_INSTAGRAM_USER_PROFILE_FAILURE, error: Messages.NetWorkError });
    console.log(error);
  }
}

export default [
  takeLatest(Types.GET_CURRENT_USER, GetCurrentUser),
  takeLatest(Types.LOGIN_USER, LoginUser),
  takeLatest(Types.LOGIN_WITH_SOCIAL, LoginWithSocial),
  takeLatest(Types.RESTORE_USER, RestoreUser),
  takeLatest(Types.CHECK_EMAIL, CheckEmail),
  takeLatest(Types.REGISTER_USER, RegisterUser),
  takeLatest(Types.FORGOT_PASSWORD, ForgotPassword),
  takeLatest(Types.VERIFY_CODE_PASSWORD, VerifyCodePassword),
  takeLatest(Types.RESET_PASSWORD, ResetPassword),
  takeLatest(Types.CHANGE_AVATAR, ChangeAvatar),
  takeLatest(Types.CHANGE_PASSWORD, ChangePassword),
  takeLatest(Types.CHANGE_EMAIL, ChangeEmail),
  takeLatest(Types.CHANGE_PHONE, ChangePhone),
  takeLatest(Types.CHANGE_ADDRESS, ChangeAddress),
  takeLatest(Types.GET_USER, GetUser),
  takeLatest(Types.GET_INSTAGRAM_USER_PROFILE, GetInstagramUserProfile),
];
