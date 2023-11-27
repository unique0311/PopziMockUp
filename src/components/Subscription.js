import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking,
    Platform,
} from 'react-native';

import RoundButton from  '../components/RoundButton';

import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

class Subscription extends React.Component {

    constructor(){
        super();
    }

    render(){
        const { subscription, onPress, receipt } = this.props;

        // let currency = new Intl.NumberFormat('en-us', { style: 'currency', currency: subscription.currency }).format(Number(subscription.price).toFixed(2));

        const { productId } = subscription;
        const btnTitle = productId == 'popzi.premium' ? "GET PREMIUM" : "UPGRADE";
        const isExist = receipt != null && productId == receipt.productId;
        const bg = isExist ? Colors.redDarkColor : Colors.blueColor; 
        return (
            <View style={{...styles.container, backgroundColor: bg}}>
                <Text style={styles.title}>{subscription.title}</Text>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={styles.description}>{subscription.description}</Text>
                    <View style={{ alignItems: 'center', width: '40%'}}>
                        <Text style={styles.price}>{subscription.localizedPrice}</Text>
                    </View>
                </View>
                {
                    receipt == null
                    ? <RoundButton title={btnTitle} theme="black" onPress={onPress} />
                    : ( productId == receipt.productId && productId == 'popzi.premium' && <RoundButton title={"CANCEL SUBSCRIPTION"} theme="black" onPress={() => {
                        if (Platform.OS == 'android')
                            Linking.openURL(`https://play.google.com/store/account/subscriptions?package=${'com.popzi'}&sku=${productId}`);
                        else if (Platform.OS == 'ios')
                            Number(Platform.Version) >= 12
                            ? Linking.openURL('https://apps.apple.com/account/subscriptions')
                            : Linking.openURL('https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions');
                        }} />)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        justifyContent: 'space-between'
    },
    title: {
        color: 'white',
        fontFamily: Fonts.latoBold,
        fontSize: 20,
        marginVertical: 5,
    },
    description: {
        color: 'white',
        width: '60%',
    },
    price: {
        color: 'white',
        fontSize: 30
    },
});
export default Subscription;
