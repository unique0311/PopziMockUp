import AsyncStorage from '@react-native-async-storage/async-storage';
import RetroSettingsStorage from './RetroSettingsStorage';

const USERID_KEY = 'USERID';
const CURRENT_USER_KEY = 'CURRENT_USER';
const APPLE_USERS_KEY = 'APPLE_USERS_KEY';

export const USERID = {
  get: async () => {
    const user_id = await AsyncStorage.getItem(USERID_KEY);
    if (user_id) {
      return user_id;
    }
    return '';
  },
  set: (user_id) => AsyncStorage.setItem(USERID_KEY, user_id),
  remove: () => AsyncStorage.removeItem(USERID_KEY),
};

export const CURRENT_USER = {
  set: (user) => AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)),
  get: () => AsyncStorage.getItem(CURRENT_USER_KEY).then((user) => (user ? JSON.parse(user) : [])),
  remove: () => AsyncStorage.removeItem(CURRENT_USER_KEY),
};

export const APPLE_USERS = {
  set: (users) => AsyncStorage.setItem(APPLE_USERS_KEY, JSON.stringify(users)),
  get: () => AsyncStorage.getItem(APPLE_USERS_KEY).then((users) => (users ? JSON.parse(users) : [])),
  remove: () => AsyncStorage.removeItem(APPLE_USERS_KEY),
};

