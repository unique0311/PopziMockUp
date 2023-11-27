/*  ====================================================

Must call this function when you get information of IAP.
await connectIAP();
'or'
await connectIAP(goNext);
--------------------------------------------------------
async componentDidMount() {
    await connectIAP();
}

componentWillUnmount() {
    disconnectIAP();
}

=======================================================*/
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

const itemSubs = Platform.select({
    ios: [
        'popzi.premium',
    ],
    android: [
        'popzi.premium',
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

export let productsOfIAP = [];
export let subscriptionsOfIAP = [];
export let availableSubscriptionOfIAP = [];
//  Return 'premium' or 'free'
export let currentIAPState = null; 

let purchaseUpdateSubscription = null;
let purchaseErrorSubscription = null;

/*
* function goNext
*/

export const connectIAP = async (goNext = null) => {
    try {
        const result = await RNIap.initConnection();
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
        // console.log('result', result);
    } catch (err) {
        console.log(err.code, err.message);
    }

    await getProducts();
    await getSubscriptions();
    await getAvailablePurchases();

    purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase) => {
            const receipt = purchase.transactionReceipt;
            if (receipt) {
                try {
                    if (Platform.OS === 'ios') {
                        finishTransactionIOS(purchase.transactionId);
                    } else if (Platform.OS === 'android') {
                        // // If consumable (can be purchased again)
                        consumePurchaseAndroid(purchase.purchaseToken);
                        // If not consumable
                        acknowledgePurchaseAndroid(purchase.purchaseToken);
                    }
                    const ackResult = await finishTransaction(purchase, false);
                    
                } catch (ackErr) {
                    console.log('ackErr', ackErr);
                }
                goNext != null && goNext();
            }
        },
    );

    purchaseErrorSubscription = purchaseErrorListener(
        (error) => {
            console.log('purchaseErrorListener', error);
        },
    );
};

export const disconnectIAP = () => {
    if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
    }
    RNIap.endConnection();
};


// Version 3 apis
export const requestPurchase = async (sku) => {
    try {
        RNIap.requestPurchase(sku);
    } catch (err) {
        console.log("Purchase Error", err.message);
    }
};

export const requestSubscription = async (sku) => {
    try {
        RNIap.requestSubscription(sku);
    } catch (err) {
        console.log("Subscription Error", err.message);
    }
};


const getProducts = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // console.log('Products', products);
      productsOfIAP = products;
    } catch (err) {
      console.log(err.code, err.message);
    }
};

const getSubscriptions = async () => {
    try {
        const subscriptions = await RNIap.getSubscriptions(itemSubs);
        // console.log('Subscriptions', products);
        subscriptionsOfIAP = subscriptions;
    } catch (err) {
        console.log(err.code, err.message);
    }
};

const getAvailablePurchases = async () => {
    try {
        console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
        );
        const purchases = await RNIap.getAvailablePurchases();
        console.info('Available purchases :: ', purchases);
        if (purchases && purchases.length > 0) {
            availableSubscriptionOfIAP = purchases.map(purchase => JSON.parse(purchase.transactionReceipt));
            currentIAPState = availableSubscriptionOfIAP[0].productId.split('.')[1];
        }
    } catch (err) {
        console.log(err.code, err.message);
        console.log(err.message);
    }
};