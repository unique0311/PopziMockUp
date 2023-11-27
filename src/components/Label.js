import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Fonts from '../theme/Fonts'

export default class Label extends React.Component {
  	render() {
		const { title, color } = this.props;
		var textColor = 'white';
		if (color) {
			textColor = color;
		}
    	return (
	   		<Text style={[this.props.style, styles.textLabel, {color: textColor}]}>{title}</Text>
    	);
  	}
}

const styles = StyleSheet.create({
	textLabel: {
		fontFamily: Fonts.latoBold,
		fontSize: 16,
	}
});