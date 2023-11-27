import React, { Component } from 'react';
import {
  View,
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
} from 'react-native';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import { connect } from 'react-redux';

import Subscription from '../components/Subscription';
import TopNavBar from '../components/TopNavBar';
import LoadingOverlay from '../components/LoadingOverlay'
import RoundButton from '../components/RoundButton';

import Messages from '../theme/Messages';
import Colors from '../theme/Colors'
import Fonts from '../theme/Fonts';

import actionTypes from '../actions/actionTypes';
import { Status, TOAST_SHOW_TIME, PASSWORD_MIN_LENGTH } from '../constants.js'
import ActionSheet from 'react-native-actionsheet';
import {TouchableOpacity} from "react-native-gesture-handler";
import Images from "../theme/Images";

const itemSubs = Platform.select({
  ios: [
      'popzi.premium.yearly',
  ],
  android: [
      'popzi.premium.yearly',
  ],
});

const itemSkus = Platform.select({
  ios: [
      'popzi.free.trial',
  ],
  android: [
      'popzi.free.trial',
  ],
});

let purchaseUpdateSubscription = null;
let purchaseErrorSubscription = null;
let currentSubscriptionState = true;
let interval = null;

class SubscriptionScreen extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      subscriptions: [],
      errorMessage: '',
    }
  }

  async componentDidMount() {

    try {
      const result = await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      // console.log('result', result);
    } catch (err) {
        console.log(err.code, err.message);
        this.setState({errorMessage: err.message});
    }

    // await this.getProducts();
    await this.getSubscriptions();
    if (Platform.OS == "ios") {
      let temp = this.state.subscriptions;
      temp[0].title = "Pozi Upgrade for only $0.99";
      temp[0].description = "Upgrade to more than 3 photos";
      // temp[1].title = "Popzi Premium"
      // temp[1].description = "Unlock the ability to take non-stop or higher picture count images";
      this.setState({subscription: temp});
    }
    // await this.getAvailablePurchases();

    this.setState({ isLoading: false });

    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
            try {
              if (
                purchase.purchaseStateAndroid === 1 &&
                !purchase.isAcknowledgedAndroid
              ) {
                try {
                  const ackResult = await acknowledgePurchaseAndroid(
                    purchase.purchaseToken,
                  );
                } catch (ackErr) {
                  console.warn('ackErr', ackErr);
                }
              }
              let productId, purchaseTime;
              if (Platform.OS == "android"){
                productId = JSON.parse(receipt).productId;
                purchaseTime = JSON.parse(receipt).purchaseTime;
              }
              else {
                productId = purchase.productId;
                purchaseTime = purchase.transactionDate;
              }
              this.props.dispatch({
                type: actionTypes.ADD_SUBSCRIPTION,
                user_id: this.props.currentUser._id,
                data: {
                  productId,
                  purchaseTime,
                  type: 'subscribe',
                },
              });

              if (Platform.OS === 'ios') {
                finishTransactionIOS(purchase.transactionId);
              } else if (Platform.OS === 'android') {
                  // // If consumable (can be purchased again)
                  consumePurchaseAndroid(purchase.purchaseToken);
                  // If not consumable
                  acknowledgePurchaseAndroid(purchase.purchaseToken);
              }
            } catch (ackErr) {
                console.log('ackErr', ackErr);
            }
            this.goNext();
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
        (error) => {
            console.log('purchaseErrorListener', error);
        },
    );

    let _SELF = this;
    const currentSubscription = this.props.currentSubscription;
    if (Platform.OS == "android") {
      interval = setInterval(() => {
        RNIap.getAvailablePurchases().then(purchases => {
          console.log(purchases);
          let receipt = purchases.length > 0 ? JSON.parse(purchases[0].transactionReceipt) : {productId: null};
          console.log("receipt 5", receipt, currentSubscription);
          if (receipt.productId == 'popzi.premium.yearly'){
            if ((currentSubscriptionState == true && receipt.autoRenewing == false)){
              _SELF.props.dispatch({
                type: actionTypes.CANCEL_SUBSCRIPTION,
                user_id: _SELF.props.currentUser._id,
                productId: receipt.productId,
              });
              currentSubscriptionState = receipt.autoRenewing;
              clearInterval(interval);
            }
          }
          else if (receipt.productId == null && currentSubscription.productId == 'popzi.premium.yearly') {
            _SELF.props.dispatch({
              type: actionTypes.CANCEL_SUBSCRIPTION,
              user_id: _SELF.props.currentUser._id,
              productId: currentSubscription.productId,
            });
            clearInterval(interval);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
      }, 5000);
    }
    else {
      interval = setInterval(() => {
      RNIap.getAvailablePurchases().then(purchases => {
        console.log(purchases);
        let receipt = purchases.length > 0 ? JSON.parse(purchases[0].transactionReceipt) : {productId: null};
        console.log("receipt 5", receipt, currentSubscription);
        if (receipt.productId == 'popzi.premium.yearly'){
          if ((currentSubscriptionState == true && receipt.autoRenewing == false)){
            _SELF.props.dispatch({
              type: actionTypes.CANCEL_SUBSCRIPTION,
              user_id: _SELF.props.currentUser._id,
              productId: receipt.productId,
            });
            currentSubscriptionState = receipt.autoRenewing;
            clearInterval(interval);
          }
        }
        else if (receipt.productId == null && currentSubscription.productId == 'popzi.premium.yearly') {
          _SELF.props.dispatch({
            type: actionTypes.CANCEL_SUBSCRIPTION,
            user_id: _SELF.props.currentUser._id,
            productId: currentSubscription.productId,
          });
          clearInterval(interval);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
      }, 5000);
    }
    
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.getSubscriptionStatus != this.props.getSubscriptionStatus) {
      if (this.props.getSubscriptionStatus == Status.SUCCESS) {
        
      } else if (this.props.getSubscriptionStatus == Status.FAILURE) {
        // this.onFailure(this.props.errorMessage);
      }
    }
  }

  getProducts = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // console.log('Products', products);
      this.setState({subscriptions: [...this.state.subscriptions, ...products]});
    } catch (err) {
      console.log(err.code, err.message);
    }
  };

  getSubscriptions = async () => {
    try {
        const subscriptions = await RNIap.getSubscriptions(itemSubs);
        this.setState({subscriptions: [...this.state.subscriptions, ...subscriptions]});
        // console.log('Subscriptions', products);
    } catch (err) {
        console.log(err.code, err.message);
    }
  };

  requestPurchase = async (sku) => {
    try {
        RNIap.requestPurchase(sku);
    } catch (err) {
        console.log("Purchase Error", err.message);
    }
  };

  requestSubscription = async (sku) => {
    try {
        RNIap.requestSubscription(sku);
    } catch (err) {
        console.log("Subscription Error", err.message);
    }
  };

  componentWillUnmount() {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
    RNIap.endConnection();
    clearInterval(interval);
  }

  goNext = () => {
    this.props.navigation.navigate("Confirmation");
  }

  onSubscription = (subscription) => {
    const { productId } = subscription;
    productId == "popzi.premium.yearly"
    ? this.requestSubscription(productId)
    : this.requestPurchase(productId)
  }

  restorePurchases = () => {
    try {
      console.info(
      'Get available purchases (non-consumable or unconsumed consumable)',
      );
      RNIap.getAvailablePurchases().then(purchases => {
        let receipt = JSON.parse(purchases[0].transactionReceipt);
        this.props.dispatch({
          type: actionTypes.ADD_SUBSCRIPTION,
          user_id: this.props.currentUser._id,
          data: {
            productId: receipt.productId,
            purchaseTime: receipt.purchaseTime,
            type: 'resubscribe',
          },
        });
        RNIap.consumePurchaseAndroid(receipt.purchaseToken);
      })
      .catch(err => {

      });
    } catch (err) {
        console.log(err.code, err.message);
        console.log(err.message);
    }
  }

  render() {
    const { subscriptions, errorMessage } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.greenBrightColor}}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={styles.container}>
              <TopNavBar theme="blue" title="SUBSCRIPTIONS"/>
              <Text style={styles.errorText}>{errorMessage}</Text>
              {
                subscriptions.map((subscription, i) => (
                  <Subscription
                    key={i}
                    subscription={subscription}
                    receipt={this.props.currentSubscription}
                    onPress={() => this.onSubscription(subscription)}
                  />
                ))
              }
              {/* <RoundButton title="Restore Purchase" theme="black" onPress={this.restorePurchases} style={{width: '100%'}}/> */}
            </View>
          </ScrollView>
          { this.state.isLoading && <LoadingOverlay /> }
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    fontFamily: Fonts.latoBold,
  },
  errorText: {
    fontFamily: Fonts.latoRegular,
    fontSize: 18,
    textAlign: 'center',
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
    currentSubscription: state.subscription.currentSubscription,
    getSubscriptionStatus: state.subscription.getSubscriptionStatus,
    addSubscriptionStatus: state.subscription.addSubscriptionStatus,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen);
