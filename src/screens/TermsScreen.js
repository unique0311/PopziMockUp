import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import TopNavBar from '../components/TopNavBar'
import { WebView } from 'react-native-webview';
import Colors from '../theme/Colors'
import { TERMS_LINK } from '../constants';

class TermsScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super()
  }

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.page) {
      const { page } = this.props.route.params;
      this.setState({page: page});
    }
  }

  onBack() {
    this.props.navigation.goBack();
  }

  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color={Colors.appColor}
        size='large'
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
 

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.greenColor}}>
        <View style={{flex: 1}} >
          <SafeAreaView style={{flex: 1}}>
            <TopNavBar 
              title="Privacy Policy" 
              theme="black"
            />                      
            <View style={styles.container}>
              <WebView 
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                renderLoading={this.ActivityIndicatorLoadingView} 
                startInLoadingState={true}  
                source={{ uri: TERMS_LINK }} 
              />
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },

  ActivityIndicatorStyle:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  
  }
})
