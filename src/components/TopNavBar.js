import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Colors from '../theme/Colors';
import Images from '../theme/Images';
import Fonts from '../theme/Fonts';
import { ifIphoneX } from 'react-native-iphone-x-helper'

const screenWidth = Dimensions.get('window').width;

export default class TopNavBar extends React.Component {
  render() {
	const { 
		title,
		theme, 
		rightButton, 
		onBack, 
	} = this.props;

	var textColor = Colors.appColor;
	var backIcon = Images.back_arrow;
	if (theme == "black") {
		textColor = 'black';
	}
	else (theme == "blue")
		textColor = Colors.blueColor;
	
    return (
	    <View style={[styles.container]}>
	    	<View style={{ position: 'relative', width: screenWidth }}>
				{
					rightButton == "back" &&
					<TouchableOpacity style={styles.rightBtn} onPress={() => onBack()}>
						<Image
							style={styles.rightIcon}
							source={backIcon}
						/>
					</TouchableOpacity>
				}
				<Text 
					numberOfLines={1}  
					style={[
						styles.titleText, 
						{color: textColor},
						{fontSize: 20},
						{fontFamily: Fonts.latoBold}
					]}>
						{title}
				</Text>	  
					
	    	</View>
	    </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		zIndex: 3,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		...ifIphoneX({
			paddingVertical: 20,
		 }, {
			paddingVertical: 20,
		}),
	},

	titleText: {
		textAlign: 'center',
		fontFamily: Fonts.bold,
		color: 'black',
		marginHorizontal: 50, 
	},

	rightBtn: {
		position: 'absolute',
		right: 15,
		...ifIphoneX({
			top: 15,
		 }, {
			top: 3,
		})
	},

	rightIcon: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
});