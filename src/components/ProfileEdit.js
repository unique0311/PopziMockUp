import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import RoundButton from './RoundButton'

import Images from '../theme/Images';
import Fonts from '../theme/Fonts';
import Messages from '../theme/Messages';

import { TOAST_SHOW_TIME } from '../constants.js'
import { isValidEmail } from '../functions'

class ProfileEdit extends Component {
  static navigationOptions = {
    headerShown: false,
  };


  constructor(props) {
    super(props);
    this.state = {
      status: 0, //  0: edit, 1: save
    };
  }

  onPress() {
    const { status, content } = this.state;
    const { onSubmit, parent, type } = this.props;

    if (status === 1){
      if (type === "email") {
        if (content == null || content.length <= 0 || !isValidEmail(content)){
          parent.toast.show(Messages.InvalidEmail, TOAST_SHOW_TIME);
        }
        else {
          onSubmit(content);
          this.setState({
            status: 1 - status
          });
        }
      }
      else if (type === "contact") {
        if (content === null || content.length <=0){
          parent.toast.show(Messages.InvalidPhone, TOAST_SHOW_TIME);
        }
        else {
          onSubmit(content);
          this.setState({
            status: 1 - status
          });
        }
      }
      else if (type === "address") {
        if (content === null || content.length <=0){
          parent.toast.show(Messages.InvalidAddress, TOAST_SHOW_TIME);
        }
        else {
          onSubmit(content);
          this.setState({
            status: 1 - status
          });
        }
      }
    }
    else {
      this.setState({
        status: 1 - status
      });
    }
  }

  componentDidMount(){
    this.setState({
      content: this.props.content
    });
  }

  render() {
    const { type, title, content } = this.props;
    const icon = type + '_icon';
    const status = this.state.status;
    let keyboardType = "";
    if (type == "email")
      keyboardType = "email-address";
    else if (type == "contact")
      keyboardType = "phone-pad";
    return (
      <View style={{flex: 1, backgroundColor:'white'}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <Image source={Images[icon]} style={styles.icon}/>
            <View style={{flex: 0.8, flexDirection: "column"}}>
              <Text style={styles.text}>{title}</Text>
              {
              !status
                ? <Text style={styles.text}>{content}</Text>
                : <TextInput 
                    value={this.state.content}
                    keyboardType={keyboardType}
                    onChangeText={(value) => {
                      this.setState({content: value
                      })
                    }}
                  />
              }
            </View>
            <RoundButton title={ !status ? "EDIT" : "SAVE"} theme="yellow" onPress={() => this.onPress()}/>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    fontFamily: Fonts.latoMedium
  },
})

export default ProfileEdit;
