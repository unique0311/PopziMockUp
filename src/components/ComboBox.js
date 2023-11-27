import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import Images from '../theme/Images'
import Fonts from '../theme/Fonts'

export default class ComboBox extends React.Component {
  	render() {
		const {selected, gender, onChange} = this.props;
    	return (
		   	<View style={styles.container}>
		   		<TouchableOpacity style={styles.checkboxButton} onPress={() => onChange(gender)}>
		   			{
		   				selected === gender
		   				? <Image style={styles.checkboxIcon} source={Images.combo_checked}/>
		   				: <Image style={styles.checkboxIcon} source={Images.combo_unchecked}/>
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
		flex: 0.3,
		flexDirection: 'row',
		alignItems: 'center',
	},

	checkboxIcon: {
		width: 50,
		height: 50,
	},

	textLabel: {
		marginLeft: 10,
		fontFamily: Fonts.wsRegular,
	},
});