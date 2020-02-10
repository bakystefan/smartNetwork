import React, { PureComponent, useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
} from 'react-native';

const initialState = {
  isFocused: false,
};

const floatTextInputInactive = {
  color: '#FFF',
  top: 18,
  fontSize: 15,
  fontWeight: 'bold',
};

const floatTextInputActive = {
  color: '#FFF',
  top: 0,
  fontSize: 10,
};

const styles = StyleSheet.create({
  floatTextInputContainer: {
    paddingTop: 18,
    width: '100%',
    borderBottomWidth: 1,
  },
  floatTextInputLabel: {
    position: 'absolute',
    left: 0,
  },
  floatTextInputArea: {
    height: 43,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const FloatText = ({ value, label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 200,
    }).start();
  }, [isFocused]);
  
  const labelStyle = {
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        floatTextInputInactive.top,
        floatTextInputActive.top,
      ],
    }),
    fontSize: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        floatTextInputInactive.fontSize,
        floatTextInputActive.fontSize,
      ],
    }),
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [
        floatTextInputInactive.color,
        floatTextInputActive.color,
      ],
    }),
  };
  
  const focusHasValue = isFocused || !!value;
  return (
    <View style={[
      styles.floatTextInputContainer,
      {
        borderColor: (
          focusHasValue ? floatTextInputActive.color : floatTextInputInactive.color
        ),
      },
    ]}
    >
      <Animated.Text
        style={[
          styles.floatTextInputLabel,
          labelStyle,
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        {...props} 
        style={styles.floatTextInputArea}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
    </View>
  )
} 

export default FloatText;
