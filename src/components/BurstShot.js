import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

import Images from  '../theme/Images';

const screenWidth = Dimensions.get('window').width;

class BurstShot extends Component {

    constructor(props){
        super(props);
        this.onSubBtnClicked = this.onSubBtnClicked.bind(this);
        this.onAddBtnClicked = this.onAddBtnClicked.bind(this);
    }

    onSubBtnClicked(){
        const {value, onChange} = this.props;
        if (value != 1)
            onChange(value - 1);
    }

    onAddBtnClicked(){
        const { limitShot, value, onChange } = this.props;
        if ((limitShot && value < 3) || !limitShot)
           onChange(value + 1);
    }

    render(){
        let { title, suffix, value } = this.props;
        suffix = suffix === undefined ? '' : ' ' + suffix;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.content_view}>
                    <TouchableOpacity onPress={this.onSubBtnClicked}>
                        <Image source={Images.angle_left_icon} style={styles.angle_icon}/>
                    </TouchableOpacity>
                    <Text style={styles.content}>{value + suffix}</Text>
                    <TouchableOpacity onPress={this.onAddBtnClicked}>
                        <Image source={Images.angle_right_icon} style={styles.angle_icon}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {

    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    content_view: {
        width:screenWidth - 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content:{
        color: 'white',
        fontSize: 18
    },
    angle_icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
};

export default BurstShot;
