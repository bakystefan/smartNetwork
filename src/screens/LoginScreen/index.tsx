import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import LoginScreenHeader from '../../components/loginScreenHeader';
import LoginScreenMain from '../../components/loginScreenMain';
import LoginActions from '../../redux/reducers/auth';
import ReactNativeBiometrics from 'react-native-biometrics'
import * as Keychain from 'react-native-keychain';

const LoginScreen = ({ auth, attemptLogin, profile, network }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  useEffect(() => {
    checkForBiometric();
  }, [])
  
  const checkForBiometric = async () => {
    try {
      const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable()
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          console.log('TouchID is supported')
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
          console.log('FaceID is supported')
        } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
          const { username, password } = credentials;
          const { success } = await ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
          if (success) {
            attemptLogin(username, password);
          }
        } else {
          console.log('Biometrics not supported')
        }
      }
      
    } catch (error) {
      console.log("JA  SAM ERROR ", error);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding' })}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground 
          source={require('../../assets/images/loginBackgroundCircle.png')} 
          style={styles.backgroundStyle}
        >
          <View style={{ flex: 1 }}>
            <LoginScreenHeader />
            
            <LoginScreenMain
              password={password}
              email={email}
              setEmail={setEmail}
              setPassword={setPassword}
              loginFunc={() => attemptLogin(email, password)}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5F72FF'
  },
  backgroundStyle: { 
    flex: 1,
    width: '100%'
  }
});

const mapStateToProps = state => ({ auth: state.auth, profile: state.profile, network: state.network });

const mapDispatchToProps = (dispatch: any) => ({
  attemptLogin: (email: string, password: string) => dispatch(LoginActions.loginRequest(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
