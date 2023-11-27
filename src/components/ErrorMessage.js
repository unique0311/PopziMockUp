import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Fonts from '../theme/Fonts'

export default class ErrorMessage extends React.Component {
  	render() {
    	return (
	   		<Text style={[this.props.style, styles.textLabel]}>{this.props.text}</Text>
    );
  }
}

const styles = StyleSheet.create({
	textLabel: {
		fontFamily: Fonts.regular,
		fontSize: 11,
		fontStyle: 'italic',
	}
});