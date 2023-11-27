import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import EditAvatar from '../EditAvatar'
import RoundTextInput from '../RoundTextInput'
import Colors from '../../theme/Colors'

import { compressImage } from '../../functions';

export default class RegisterPage extends React.Component {
	onTakePicture() {
		const { onChangeUser } = this.props;
		const options = {
			title: 'Select Photo',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};
		launchImageLibrary(options, async (res) => {
			if (res.didCancel != true) {
				const compressedAvatar = await compressImage(res);
				onChangeUser("avatar", compressedAvatar.uri);
				onChangeUser("avatarFile", compressedAvatar);
			}
		});
	}

	render() {
		const { user, onChangeUser } = this.props;
		return (
			<View style={styles.container}>
				<View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20,}}>
					<EditAvatar avatar={user.avatar} onTakePhoto={() => this.onTakePicture()} />
				</View>
				<RoundTextInput
					placeholder="First name" 
					type="text"
					placeholderTextColor={Colors.greenColor}
					value={user.firstName} 
					errorMessage={user.firstNameError}		               
					returnKeyType="next"
					onSubmitEditing={() => { this.lastNameInput.focus() }}
					onChangeText={(text) => onChangeUser("firstName", text)} 
				/>

				<RoundTextInput
					placeholder="Last name" 
					type="text"
					placeholderTextColor={Colors.greenColor}
					value={user.lastName} 
					errorMessage={user.lastNameError}
					returnKeyType="next"
					onSubmitEditing={() => { this.emailInput.focus() }}
					onRefInput={(input) => { this.lastNameInput = input }}
					onChangeText={(text) => onChangeUser("lastName", text)} 
				/>

				<RoundTextInput
					placeholder="Email" 
					type="email"
					placeholderTextColor={Colors.greenColor}
					value={user.email} 
					errorMessage={user.emailError}
					returnKeyType="next"
					onSubmitEditing={() => { this.phoneInput.focus() }}
					onRefInput={(input) => { this.emailInput = input }}
					onChangeText={(text) => onChangeUser("email", text)} />

				<RoundTextInput
					placeholder="Phone" 
					type="phone"
					placeholderTextColor={Colors.greenColor}
					value={user.phone} 
					errorMessage={user.phoneError}
					returnKeyType="next"
					onSubmitEditing={() => { this.addressInput.focus() }}
					onRefInput={(input) => { this.phoneInput = input }}
					onChangeText={(text) => onChangeUser("phone", text)} />
				<RoundTextInput
					placeholder="Address" 
					type="text"
					placeholderTextColor={Colors.greenColor}
					value={user.address} 
					errorMessage={user.addressError}
					returnKeyType="next"
					onSubmitEditing={() => {user.socialId == null && this.passwordInput.focus()}}
					onRefInput={(input) => { this.addressInput = input }}
					onChangeText={(text) => onChangeUser("address", text)} />
				{
					user.socialId == null
					? <View>
							<RoundTextInput
								placeholder="Password" 
								type="password"
								placeholderTextColor={Colors.greenColor}
								value={user.password}
								errorMessage={user.passwordError} 
								returnKeyType="next"
								onSubmitEditing={() => { this.confirmPasswordInput.focus() }}
								onRefInput={(input) => { this.passwordInput = input }}
								onChangeText={(text) => onChangeUser("password", text)} />

							<RoundTextInput
								placeholder="Confirm Password" 
								type="password"
								returnKeyType="done"
								placeholderTextColor={Colors.greenColor}
								value={user.confirmPassword} 
								errorMessage={user.confirmPasswordError} 
								returnKeyType="done"
								onRefInput={(input) => { this.confirmPasswordInput = input }}
								onChangeText={(text) => onChangeUser("confirmPassword", text)} 
								onSubmitEditing={() => {Keyboard.dismiss()}}
							/>
						</View>

					: null
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({

	container: {
	},
	rowView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

});