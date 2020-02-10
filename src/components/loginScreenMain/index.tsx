import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import FloatTextInput from '../floatInput';
import Button from '../onboardButton';

type LoginScreenMainProp = {
    email: string;
    setEmail: Function;
    password: string;
    setPassword: Function;
    loginFunc: Function;
};

const LoginScreenMain = ({ email, setEmail, password, setPassword, loginFunc }: LoginScreenMainProp) => (
    <View style={styles.container}>
        <View style={{ width: '100%' }}>
            <View style={{ marginBottom: 20, }}>
                <FloatTextInput
                    label="E-MAIL"
                    value={email}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(value) => setEmail(value)}
                />
            </View>
            <View style={{ marginBottom: 40, }}>
                <FloatTextInput
                    label="PASSWORD"
                    secureTextEntry
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
            </View>
            <View style={{ marginBottom: 60 }}>
                <Button onPressFunc={() => loginFunc()} />
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { 
        width: '100%', 
        flex: 2, 
        justifyContent: 'flex-end', 
        alignItems: 'flex-end', 
        flexDirection: 'column',
        paddingHorizontal: 40,
    }
})

export default LoginScreenMain;