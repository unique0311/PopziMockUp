import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';

import RoundButton from '../components/RoundButton'

import Images from '../theme/Images';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

class ResetPwdSuccessScreen extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.greenColor}}>
            <View style={styles.container}>
            <Image source={Images.reset_pwd_success} style={[styles.image, styles.item]}/>
                <Text style={[styles.firstText, styles.item]}>Password  Changed</Text>
                <Text style={[styles.secondText, styles.item]}>Congratulations! You've successfully changed your password.</Text>
                <RoundButton 
                    title="BACK TO LOG IN" 
                    theme="redDark"
                    style={{width: '100%'}}
                    onPress={() => {this.props.navigation.navigate('Login')}} 
                />
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  image: {
      width: '50%',
      resizeMode: 'contain',
  },
  firstText: {
    fontSize: 20,
    color: 'black',
    fontFamily: Fonts.wsSemiBold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondText: {
    fontSize: 16,
    fontFamily: Fonts.wsRegular,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  item: {
    marginVertical: 20
  }
})

export default ResetPwdSuccessScreen;