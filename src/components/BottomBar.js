import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Images from '../theme/Images';
import Fonts from '../theme/Fonts';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class BottomBar extends React.Component {
  render() {
	const { eleType, disable, doNavigate } = this.props;

	const TabButton = ({type, selSrc, unselSrc, navigate}) => (
		<TouchableOpacity onPress={() => { !disable && type != eleType && doNavigate(navigate) }}>
		{
			type == eleType
			? (
				!disable
				? <Image style={styles.activeIcon} source={selSrc}/>
				: <Image style={styles.activeDIcon} source={selSrc}/>
			)
			: (
				!disable
				? <Image style={styles.inactiveIcon} source={unselSrc}/>
				: <Image style={styles.inactiveDIcon} source={unselSrc}/>
			)
		}
		</TouchableOpacity>
	);
    return (
	    <View style={disable == true ? [styles.container, styles.disableContainer] : [styles.container]}>
			<TabButton 
				type="profile"
				selSrc={Images.bottom_nav_profile_selected}
				unselSrc={Images.bottom_nav_profile_unselected}
				navigate="Profile"
			/>
			<TabButton 
				type="capture"
				selSrc={Images.bottom_nav_capture_selected}
				unselSrc={Images.bottom_nav_capture_unselected}
				navigate="Capture"
			/>
			<TabButton 
				type="setting"
				selSrc={Images.bottom_nav_setting_selected}
				unselSrc={Images.bottom_nav_setting_unselected}
				navigate="Setting"
			/>
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
			paddingVertical: 5,
			paddingHorizontal: 10,
		 }, {
			paddingVertical: 5,
			paddingHorizontal: 10,
		}),
		backgroundColor: '#C1DCD6',
		
	},
	inactiveIcon: {
		width: 40,
		height: 40,
		marginHorizontal: 10,
		marginVertical: 10,
	},
	activeIcon: {
		width: 60,
		height: 60,
	},
	activeDIcon: {
		width: 60,
		height: 60,
		tintColor: '#666666',
	},
	inactiveDIcon: {
		width: 40,
		height: 40,
		marginHorizontal: 10,
		marginVertical: 10,
		tintColor: '#666666',
	},
	disableContainer: {
		backgroundColor: '#AAAAAA',
	},
});