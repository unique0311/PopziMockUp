import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TextInput,
  } from 'react-native';

const SplashScreen = (
  <View style={{flex: 1}}>
    <ImageBackground source={ require('../../assets/images/loading.png') } style={{flex:1, resizeMode: 'cover'}}>
      <Text>Loading</Text>
    </ImageBackground>
  </View>
);

export default SplashScreen;