import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput, 
    Image, 
    Text, 
    TouchableOpacity 
} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

class RoundTextInput extends Component {

    constructor() {
        super()
        this.state = {
          displayPassword: false,
          showAddressList: false
        }
    }

    onChangeDatePicker = (event, selectedValue) => {
        console.log("event: ", event);
        console.log("selectedValue: ", selectedValue);
    }

    render() {
        const { 
            type,
            icon, 
            value, 
            align, 
            autoFocus,
            label, 
            editable,
            onRefInput, 
            placeholder,
            placeholderTextColor,
            maxLength,
            onChangeText,
            onSubmitEditing,
            onSelect,
            returnKeyType,
            inlineImage,
        } = this.props;
        return (
            <View style={[this.props.style, styles.container]}>
                {
                    (label && label.length > 0) 
                    ? <Text style={styles.labelText}>{label}</Text>
                    : null
                }

                <View style={[styles.content, icon ? {paddingRight: 35} : {}]}>
                    {
                        (type === "text")
                        ? <TextInput
                            style={[styles.textInput, align == "center" ? styles.centerText : null]}
                            underlineColorAndroid='transparent'
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor}
                            onChangeText={this.props.onChangeText}
                            value={value}
                            autoFocus={autoFocus}
                            editable={editable}
                            maxLength={maxLength}
                            ref={onRefInput}
                            returnKeyType={returnKeyType}
                            onSubmitEditing={onSubmitEditing}
                        />
                        : null
                    }
                    {
                        (type === "button")
                        ? <TouchableOpacity onPress={onSelect}>
                            <View pointerEvents="none">
                            <TextInput
                                editable={false}
                                selectTextOnFocus={false}
                                style={[styles.textInput, align == "center" ? styles.centerText : null]}
                                underlineColorAndroid='transparent'
                                placeholder={placeholder}
                                autoFocus={autoFocus}
                                maxLength={maxLength}
                                placeholderTextColor={placeholderTextColor}
                                value={value}
                                ref={onRefInput}
                            />
                            </View>
                         </TouchableOpacity>
                        : null
                    }
                    {
                        (type === "number")
                        ? <TextInput
                            style={[styles.textInput, align == "center" ? styles.centerText : null]}
                            underlineColorAndroid='transparent'
                            keyboardType={'numeric'}
                            placeholderTextColor={placeholderTextColor}
                            onChangeText={onChangeText}
                            editable={editable}
                            autoFocus={autoFocus}
                            value={value}
                            maxLength={maxLength}
                            placeholder={placeholder}
                            ref={onRefInput}
                            returnKeyType={returnKeyType}
                            onSubmitEditing={onSubmitEditing}
                        />
                        : null
                    }
                    {
                        (type === "phone")
                        ? <TextInput
                            style={[styles.textInput, align == "center" ? styles.centerText : null]}
                            underlineColorAndroid='transparent'
                            keyboardType='phone-pad'
                            placeholderTextColor={placeholderTextColor}
                            onChangeText={onChangeText}
                            value={value}
                            autoFocus={autoFocus}
                            editable={editable}
                            maxLength={maxLength}
                            placeholder={placeholder}
                            ref={onRefInput}
                            returnKeyType={returnKeyType}
                            onSubmitEditing={onSubmitEditing}
                        />
                        : null
                    }

                    {
                        (this.props.type === "email")
                        ? <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={styles.textInput}
                            keyboardType='email-address'
                            placeholderTextColor={placeholderTextColor}
                            underlineColorAndroid='transparent'
                            onChangeText={onChangeText}
                            value={value}
                            autoFocus={autoFocus}
                            maxLength={maxLength}
                            editable={editable}
                            placeholder={placeholder}
                            ref={onRefInput}
                            returnKeyType={returnKeyType}
                            onSubmitEditing={onSubmitEditing}
                            inlineImageLeft={inlineImage}
                            inlineImagePadding={50}
                        />
                        : null
                    }

                    {
                        (type === "password")
                        ? <TextInput
                            textContentType="none"
                            secureTextEntry={!this.state.displayPassword}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={[styles.textInput]}
                            maxLength={maxLength}
                            autoFocus={autoFocus}
                            placeholderTextColor={placeholderTextColor}
                            underlineColorAndroid='transparent'
                            onChangeText={onChangeText}
                            value={value}
                            editable={editable}
                            placeholder={placeholder}
                            ref={onRefInput}
                            returnKeyType={returnKeyType}
                            onSubmitEditing={onSubmitEditing}
                            inlineImageLeft={inlineImage}
                            inlineImagePadding={50}
                        />
                        : null
                    }
                </View>              
                {
                    icon &&
                    <Image source={icon} style={styles.iconImage}/>
                }
                {
                    this.props.errorMessage
                    ? <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
                    : null
                }
            </View>
        );
    }
}

export default RoundTextInput;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },

    content: {
        borderWidth: 0.5,
        borderColor: '#e6e6e6',
        paddingVertical: 2,
        borderRadius: 10,
        paddingHorizontal: 17,
        backgroundColor: 'white',
        shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.07,
		shadowRadius: 2,
        marginLeft: 5,
        marginRight: 5
    },

    labelText: {
        fontFamily: Fonts.bold,
        color: 'black',
        fontSize: 16,
        marginBottom: 10,
    },
    
    textInput: {
        fontFamily: Fonts.wsRegular,
        fontSize: 15,
        height: 60,
        color: Colors.textColor,
    },

    iconImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
    },

    errorMessage: {
        fontFamily: Fonts.wsRegular,
        fontStyle: 'italic',
        color: '#cf0000',
        fontSize: 11,
        marginLeft: 20,
        marginTop: 5,
    },

    centerText: {
        textAlign: 'center'
    },
});