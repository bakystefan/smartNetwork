import React, { useState } from 'react';
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

const LoginScreen = ({ auth, attemptLogin }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
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

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = (dispatch: any) => ({
  attemptLogin: (email: string, password: string) => dispatch(LoginActions.loginRequest(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
