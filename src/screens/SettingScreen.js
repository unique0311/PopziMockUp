import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';

import BottomBar from '../components/BottomBar';
import TopNavBar from '../components/TopNavBar';

import RoundButton from '../components/RoundButton'
import Images from '../theme/Images';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

class SettingScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super()
  }

  render() {
    let secondTextSuffix;
    let productId = this.props.currentSubscription != null ? this.props.currentSubscription.productId : null;
    if (productId == "popzi.premium")
      secondTextSuffix = "";
    else if (productId == "popzi.free.trial")
      secondTextSuffix = ", only one time";
    else
      secondTextSuffix = ", upgrade to Premium";
    return (
      <View style={{flex: 1, backgroundColor: Colors.greenBrightColor,}}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={styles.container}>
              <TopNavBar theme="blue" title="SETTINGS"/>
              <Image source={Images.setting_avatar} style={styles.setting_avatar}/>
              <Text style={styles.text_first}>{productId == null && 'The Free Version allows a maximum of 3 shots only.'}</Text>
              <Text style={styles.text_second}>To enjoy unlimited number of shots {secondTextSuffix}.</Text>
              <RoundButton
                  title="UPGRADE TO PREMIUM"
                  theme="red"
                  style={styles.btn}
                  onPress={() => {this.props.navigation.navigate('Subscription')}}/>
              </View>
          </ScrollView>
        </SafeAreaView>
        <BottomBar eleType="setting" doNavigate={this.props.navigation.navigate}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
    justifyContent: 'space-between'
  },

  setting_avatar: {
    width: '80%',
    resizeMode: 'contain',
  },

  text_first: {
    marginTop: 20,
    fontSize: 18,
    width: '90%',
    textAlign: 'center',
    fontFamily: Fonts.latoRegular,
  },

  text_second: {
    marginTop: 20,
    fontSize: 18,
    width: '70%',
    textAlign: 'center',
    fontFamily: Fonts.latoRegular,
  },
  btn: {
    width: '90%',
    marginTop: 20
  },
})

function mapStateToProps(state) {
  return {
    currentSubscription: state.subscription.currentSubscription,
  };
}

export default connect(mapStateToProps, null)(SettingScreen);
