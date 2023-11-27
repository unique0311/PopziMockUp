import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image }from 'react-native';
import Fonts from '../theme/Fonts'

export default class Button extends React.Component {
  	render() {
		const { color, type, src, height, width, margin, onPress } = this.props;
    	return (
		   	<TouchableOpacity style={[this.props.style, styles.buttonContainer]} onPress={onPress}>
				{
					type === "text" &&
					<Text style={[
						styles.textLabel, 
					 	color ? {color: color} : '',
					]}>
						{this.props.title}
					</Text>
				}
		   		{
					type === "icon" &&
					<Image
						source={src}
						style={{resizeMode: 'contain', width, height, marginHorizontal: 10}}
					/>
				}
				{
					type === "thumbnail" &&
					<Image
						source={src}
						style={{resizeMode: 'contain', width, height, borderWidth: 2, borderColor: '#C1DCD6', marginHorizontal: margin}}
					/>
				}
	   		</TouchableOpacity>
    	);
  	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: 'center',
	},

	textLabel: {
		fontFamily: Fonts.wsSemiBold,
		fontSize: 16,
		color: 'white',
	},
	underlineText: {
		textDecorationLine: 'underline',
	},
});