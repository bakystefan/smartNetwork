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

const LoginScreen = ({ auth }) => {
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
              loginFunc={() => {}}
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

export default connect(mapStateToProps)(LoginScreen);
