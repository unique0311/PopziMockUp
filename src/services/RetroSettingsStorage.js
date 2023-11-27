/**
 * This service is a wrapper for React Native Settings,
 * in order to switch from Async Storage to Settings in IOS
 * Due the lost of data that keeps the user logging out.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from 'react-native';


export default class RetroSettingsStorage {
  /**
   * Retrieves an item value by its key
   * @param {string} key Key to retrieve the item
   * @returns {Promise<string>}
   */
  static async getItem(key) {
    const v = Settings.get(key);
    if (v) {
      return v;
    }

    const v2 = await AsyncStorage.getItem(key);
    if (v2) {
      this.setItem(key, v2);
    }
    return v2;
  }

  /**
    * Sets an item.
    * @param {string} key
    * @param {string} value
    */
  static setItem(key, value) {
    AsyncStorage.setItem(key, value);
    return Settings.set({ [key]: value });
  }

  /**
    * Removes an item
    * @param {string} key Key of item to remove
    */
  static removeItem(key) {
    this.setItem(key, '');
    AsyncStorage.removeItem(key);
  }
}
