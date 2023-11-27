import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Fonts from "../theme/Fonts";
import Colors from '../theme/Colors';
import { color } from 'react-native-reanimated';

export default class RoundButton extends React.Component {
  render() {
    return (
	    <TouchableOpacity style={this.props.style} onPress={() => this.props.onPress()}>
	    	{
	    		this.props.theme == "black" 
	    		? <View style={[styles.buttonContainer, styles.blackButton]}>
					<Text style={{color: 'white'}}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}
			{
	    		this.props.theme == "red" 
	    		? <View style={[styles.buttonContainer, styles.redButton]}>
					<Text style={{color: 'white', paddingHorizontal: 10}}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}
			{
	    		this.props.theme == "redDark" 
	    		? <View style={[styles.buttonContainer, styles.redDarkButton]}>
					<Text style={{color: 'white', paddingHorizontal: 10}}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}
    		{
	    		this.props.theme == "yellow" 
	    		? <View style={[styles.buttonContainer, styles.yellowButton]}>
					<Text style={{color: 'white'}}>{this.props.title}</Text>
	    		  </View>
	    		: null
	    	}
	    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		height: 52,
		marginVertical: 5,
	}, 

	blackButton: {
		backgroundColor: Colors.blackColor,
		fontFamily: Fonts.wsSemiBold,
	},

	redButton: {
		backgroundColor: Colors.redColor,
		fontFamily: Fonts.wsSemiBold,
	},
	redDarkButton: {
		backgroundColor: Colors.redDarkColor,
		fontFamily: Fonts.latoBold,
	},
	yellowButton: {
		backgroundColor: Colors.yellowColor,
		fontFamily: Fonts.latoBold,
		width: 70,
		paddingVertical: 10,
		height: 'auto'
	}
});