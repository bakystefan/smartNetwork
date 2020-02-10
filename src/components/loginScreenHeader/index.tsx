import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { LATO_BOLD } from '../../assets/fonts';

const LoginScreenHeader = () => (
    <View style={styles.container}>
        <View style={styles.textInner}>
            <Text style={styles.textStyle}>Login to</Text>
            <Text style={styles.textStyle}>smart.board</Text>
        </View>
        <View>
            <Image source={require('../../assets/images/homeScreenShape.png')} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInner: {
        marginLeft: 40,
    },
    textStyle: {
        fontSize: 20,
        lineHeight: 21,
        color: 'white',
        fontFamily: LATO_BOLD
    }
});

export default LoginScreenHeader;