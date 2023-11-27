
import NetInfo from "@react-native-community/netinfo";
import { IMAGE_COMPRESS_QUALITY, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT } from './constants'
import { Platform } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

export const compressImage = async (imageFile) => {
  if (Platform.OS === 'android') {
    image = await ImageResizer.createResizedImage(
      imageFile.uri,
      MAX_IMAGE_WIDTH,
      MAX_IMAGE_HEIGHT,
      'JPEG',
      IMAGE_COMPRESS_QUALITY,      
    );
  } else {
    image = await ImageResizer.createResizedImage(
      imageFile.uri,
      MAX_IMAGE_WIDTH,
      MAX_IMAGE_HEIGHT,
      'JPEG',
      IMAGE_COMPRESS_QUALITY,
      0,
      RNFS.TemporaryDirectoryPath
    );
    const dest = `${RNFS.TemporaryDirectoryPath}${Math.random()}.jpg`;
    await RNFS.copyFile(image.uri, dest);
  }
  return image
}

export const makeRandomText = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const filterFileName = (file, platform) => {
  var filename = '';
  if (platform === 'ios') {
    filename = file.fileName ? file.fileName : makeRandomText(20) + ".jpg";
  } else {
    filename = file.name ? file.name : makeRandomText(20) + ".jpg";
  }
  return filename;
}

export const filterFileUri = (fileUri, platform) => {
  if (platform === "ios") {
    if (fileUri.indexOf('file://') === 0) {
      return fileUri.replace("file://", "");
    }
  } else {
    if (fileUri.indexOf('://') < 0) {
      return "file://" + fileUri;
    }
  }

  return fileUri;
}

export const isValidEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) {
    return false;
  }
  return true;
}

/**
 * compares a
 * @param {Array<any>} arr array to uniq
 * @return {Array<any>}
 */
export const uniq = (arr) => [...new Set(arr)];

/**
 * fetch a json endpoint
 * @param  {...any} params fetch params
 */
export const jsonFetch = (...params) => fetch(...params)
  .then((res) => {
    if (res.status !== 204) {
      return res.json();
    }
    return null;
  })
  .then((data) => data);

/**
 * get headers for fetch request
 * @param {string} token auth token
 */
export const fetchHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
  "Accept-Encoding" : "gzip",

});

/**
 * marks badges as locked
 */
export const lockBadge = (userBadges = []) => (badge) => {
  if (userBadges.includes(badge._id)) {
    return badge;
  }
  return { ...badge, isLock: true };
};


/**
 * Capitalizes the first letter of a string
 * @param {string} str string to capitalize
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Truncates an array
 * @param {string} str string to truncate
 * @param {number} max max allowed chars without truncation
 */

export const truncateToDecimals = (num, dec = 2) => {
  const calcDec = Math.pow(10, dec);
  return Math.trunc(num * calcDec) / calcDec;
}

export const truncate = (str = '', max = 10) => (str.length <= max ? str : (`${str.slice(0, max - 3)}...`));

export const filterOnlyDigits = (value) => {
  return value.replace(/\D/g, '');
};

export const validateZipCode = (elementValue) => {
  var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
   return zipCodePattern.test(elementValue);
}

export const kFormatter = (num) => {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  var fixed = 2;
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}

export const checkInternetConnectivity = async () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected
  });
};

export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getOnlyAlphabetLetters = (text) => {
  return  text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
};

export const filterPickerData = (data, isCapitalize) => {
  var response = [];
  for (var i = 0; i < data.length; i++) {
    const item = data[i];
    response.push({
      id: item,
      label: isCapitalize ? capitalizeFirstLetter(item) : item,
      value: item,
    });
  }

  return response;
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
