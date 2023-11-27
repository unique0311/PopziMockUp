import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Colors from '../theme/Colors'
import Images from '../theme/Images';
import Fonts from '../theme/Fonts';
import FastImage from 'react-native-fast-image'

class Avatar extends Component {
    render() {
        const { avatar, status } = this.props;
        return (
            <View style={[this.props.style, styles.container]}>
                <View style={styles.avatarBox}>
                    <FastImage
                      style={styles.avatarImage}
                      source={avatar ? {uri: avatar} : Images.account_icon}
                    />
                    {status && <Text style={styles.statusText}>{status}</Text>}
                </View>
            </View>
        );
    }
}

export default Avatar;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarBox: {
        width: 170,
        height: 170,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
        elevation: 5,
    },

    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 85,
        backgroundColor: 'lightgray',
    },

    statusText: {
        borderWidth: 1,
        borderColor: '#e4e8ea',
        borderRadius: 10,
        textTransform: 'uppercase',
        fontFamily: Fonts.regular,
        fontSize: 9,
        color: Colors.ticketColor,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: -7,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
});
