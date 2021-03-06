import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { LATO_BOLD } from '../../assets/fonts';

type OnboardButton = {
    onPressFunc: Function;
    style?: any;
    textStyle?: any;
}

const OnboardButton = ({ onPressFunc, style, textStyle }: OnboardButton) => (
    <TouchableOpacity 
        style={[styles.buttonContainer, style]}
        onPress={() => onPressFunc()}
    >
        <Text style={[styles.buttonText, textStyle]}>Log In</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    buttonContainer: { 
        width: '100%',
        borderRadius: 23,
        paddingTop: 15,
        paddingBottom: 17, 
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#5F72FF',
        fontSize: 15,
        fontFamily: LATO_BOLD
    }
});

export default OnboardButton;