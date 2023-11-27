import React from 'react';
import { StyleSheet, View,  Text } from 'react-native';
import ComboBox from '../ComboBox';

export default class SexSelect extends React.Component {
	
  	render() {
		const {selected, onChange} = this.props;
    	return (
		   	<View style={styles.container}>
		   		<ComboBox title="Male" selected={selected} gender={0} onChange={onChange}/>
		   		<ComboBox title="Female" selected={selected} gender={1} onChange={onChange}/>
	    	</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	}
});