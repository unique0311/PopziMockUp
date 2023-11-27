import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CaptureScreen from '../screens/CaptureScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import ResetNewPasswordScreen from '../screens/ResetNewPasswordScreen';
import ResetPwdSuccessScreen from '../screens/ResetPwdSuccessScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import UnSubscriptionScreen from '../screens/UnSubscriptionScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import TermsScreen from '../screens/TermsScreen';

import { store } from '../store/index';

const Stack = createStackNavigator();
const currentUser = store.getState().user.currentUser;
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="ResetNewPassword" component={ResetNewPasswordScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="ResetPwdSuccess" component={ResetPwdSuccessScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="Capture" component={CaptureScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="UnSubscription" component={UnSubscriptionScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ headerShown: false, gestureEnabled: true }}/>
        <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false, gestureEnabled: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

