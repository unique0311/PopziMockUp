import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import Images from '../theme/Images'
import Fonts from '../theme/Fonts'

export default class CheckBox extends React.Component {
  	render() {
    	return (
		   	<View style={this.props.title ? styles.containerWithText: styles.container}>
		   		<TouchableOpacity style={styles.checkboxButton} onPress={() => this.props.onChange(!this.props.value)}>
		   			{
		   				this.props.value 
		   				? <Image style={styles.checkboxIcon} source={Images.checkbox_selected}/>
		   				: <Image style={styles.checkboxIcon} source={Images.checkbox_normal}/>
		   			
		   			}
		   		</TouchableOpacity>
		   		{
		   			this.props.title 
		   			? <Text style={styles.textLabel}>{this.props.title}</Text>
		   			: null
		   		}
		   		
	    	</View>
    	);
  	}
}

const styles = StyleSheet.create({
	container: {

	},

	containerWithText: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},

	checkboxButton: {

	},

	checkboxIcon: {
		width: 25,
		height: 25,
		resizeMode: 'contain',
	},

	textLabel: {
		fontFamily: Fonts.latoBold,
		color: 'white',
	},
});