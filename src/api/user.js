import { url } from '../constants';
import { Platform } from 'react-native';
import { filterFileUri, filterFileName } from '../functions';

////////////////////////////////////////////////////////////////////////////
//////////////////////////// Login User ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const loginUser = (email, password) => {
  const method = 'POST';
  const request_url = `${url}/user/login`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    email,
    password,
    os: Platform.OS,
  });

  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
//////////////////////// Login With Social /////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const loginWithSocial = (user) => {
  const method = 'POST';
  const request_url = `${url}/user/login_with_social`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    user: user,
  });

  return fetch(request_url, { method, body, headers})
    .then(res => res.json())
    .then(res => {
        if (res.needToSignUp) {
          res.result = true;
          res.user = user;
        }
        return res;
      }
    );
};

////////////////////////////////////////////////////////////////////////////
/////////////////////// Register User //////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const registerUser = (user) => {
  const formData = new FormData();
  if (user.avatarFile) {
    var filename = filterFileName(user.avatarFile, Platform.OS);
    var filetype = user.avatarFile.type ? user.avatarFile.type : 'image/jpeg';
    const fileUri = filterFileUri(user.avatarFile.uri, Platform.OS);
    const params = {
      name: filename,
      type: filetype,
      uri: fileUri
    };
    formData.append("avatar", params);
  }

  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("password", user.password);
  formData.append("email", user.email);
  formData.append("phone", user.phone);
  formData.append("address", user.address);
  formData.append("os", Platform.OS);

  if (user.socialId) {
    formData.append("socialId", user.socialId);
  }

  if (user.socialType) {
    formData.append("socialType", user.socialType);
  }

  if (user.avatar) {
    formData.append("avatar", user.avatar);
  }
  
  console.log(formData);
  const request_url = `${url}/user/register_user`
  return fetch(request_url, {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
};

////////////////////////////////////////////////////////////////////////////
//////////////////////// Forgot Password ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const forgotPassword = (email) => {
  const method = 'POST';
  const request_url = `${url}/user/forgot_password`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    email,
  });
  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
////////////////////////// Verify Code /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const verifyCodePassword = (email, code) => {
  const method = 'POST';
  const request_url = `${url}/user/verify_resetcode`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    email,
    code,
  });
  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
/////////////////////////// Change Avatar //////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const changeAvatar = (user_id, avatarFile) => {
  const formData = new FormData();
  if (avatarFile) {
    var filename = filterFileName(avatarFile, Platform.OS);
    var filetype = avatarFile.type ? avatarFile.type : 'image/jpeg';
    const fileUri = filterFileUri(avatarFile.uri, Platform.OS);
    const params = {
      name: filename,
      type: filetype,
      uri: fileUri
    };
    formData.append("avatar", params);
  }
  formData.append('user_id', user_id);
  const request_url = `${url}/user/change_avatar`
  return fetch(request_url, {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
};


////////////////////////////////////////////////////////////////////////////
///////////////////////// Reset Password ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const resetPassword = (email, password) => {
  const method = 'POST';
  const request_url = `${url}/user/reset_newpassword`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    email: email,
    password: password
  });
  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
//////////////////////// Change Password ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const changePassword = (user_id, old_password, new_password) => {
  const method = 'POST';
  const request_url = `${url}/user/change_password`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    id: user_id,
    old_password,
    new_password
  });
  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
//////////////////////// Change Email ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const changeEmail = (user_id, new_email) => {
  const method = 'POST';
  const request_url = `${url}/user/change_email`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    id: user_id,
    new_email
  });
  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
//////////////////////// Change Phone ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const changePhone = (user_id, new_phone) => {
  const method = 'POST';
  const request_url = `${url}/user/change_phone`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    id: user_id,
    new_phone
  });
  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
//////////////////////// Change Address ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const changeAddress = (user_id, new_address) => {
  const method = 'POST';
  const request_url = `${url}/user/change_address`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    id: user_id,
    new_address
  });
  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
////////////////////////// Get User ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const getUser = (user_id) => {
  const method = 'POST';
  const request_url = `${url}/user/get_user`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    user_id: user_id,
  });

  return fetch(request_url, { method, body, headers})
    .then((res) => res.json());
};

////////////////////////////////////////////////////////////////////////////
/////////////////////////// Check Email ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const checkEmail = (email) => {
  const method = 'POST';
  const request_url = `${url}/user/check_email`
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({
    email: email,
  });

  return fetch(request_url, { method, body, headers})
    .then(res => res.json())
    .then(res => {
        return res;
      }
    );
};

////////////////////////////////////////////////////////////////////////////
////////////////////Get Instagram User Profile//////////////////////////////
////////////////////////////////////////////////////////////////////////////
export const getInstagramUserProfile = (user_id, access_token) => {
  const method = 'GET';
  const request_url = `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${access_token}`
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  return fetch(request_url, { method, headers })
    .then(res => res.json()).then(res => res);
};
