import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
// import { bindActionCreators } from  'redux';
import { connect } from 'react-redux';

const LoginScreen = ({ auth }) => (
  <View style={styles.container}>
    <Text>LoginScreen</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({ auth: state.auth });


export default connect(mapStateToProps)(LoginScreen);
