import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text
} from 'react-native';
import {connect} from 'react-redux';

import LoadingOverlay from '../components/LoadingOverlay';
import TopNavBar from '../components/TopNavBar';
import RoundButton from '../components/RoundButton';
import BottomBar from '../components/BottomBar';

import Messages from '../theme/Messages';
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts';

import actionTypes from '../actions/actionTypes';
import { Status, TOAST_SHOW_TIME, PASSWORD_MIN_LENGTH } from '../constants.js'
import ActionSheet from 'react-native-actionsheet';
import {TouchableOpacity} from "react-native-gesture-handler";
import Images from "../theme/Images";

class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <TopNavBar theme="blue" title="SUBSCRIPTIONS"/>
            <Text style={[styles.bigTitle, styles.whiteLine]}>Your Current Subsription</Text>
            <Text style={[styles.bigTitle, styles.monthlyTitle]}>Monthly Unlimited</Text>
            <Text style={styles.unlimit}>Unlimited no. of shot</Text>
            <Text style={[styles.bigTitle, styles.whiteLine]}>Plan Details</Text>
            <Text style={styles.subplan}>Next Payment Due: $3</Text>
            <Text style={styles.subplan}>Renewal Date: April 4, 2022</Text>
            <Text style={styles.subplan}>Payment Method: Credit Card</Text>
            <RoundButton 
              title="CANCEL SUBSCRIPTION" 
              theme="redDark"
              style={styles.btn}
              onPress={() => {this.props.navigation.navigate('Login')}} 
            />
          </View>
        </SafeAreaView>
        <BottomBar eleType="setting" doNavigate={this.props.navigation.navigate}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenBrightColor,
    fontFamily: Fonts.latoBold,
  },
  bigTitle: {
    fontSize: 20,
    fontFamily: Fonts.latoBold,
    padding: 20,
  },
  monthlyTitle: {
    color: Colors.redDarkColor,
    padding: 20,
  },
  subplan: {
    color: Colors.blackBrightColor,
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  unlimit: {
    color: Colors.grayColor,
    paddingHorizontal: 20,
  },
  whiteLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  btn: {
    width: '100%',
    marginTop: 20
  }
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
  };  
}

export default connect(mapStateToProps,mapDispatchToProps)(SubscriptionScreen);