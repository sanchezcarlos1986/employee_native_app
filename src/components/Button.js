import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '~/constants';

export default ({
  disabled = false,
  mode = 'contained',
  color = 'white',
  loading,
  onPress,
  children,
  customStyle = {},
  ...rest
}) => (
  <Button
    disabled={disabled}
    mode={mode}
    theme={theme}
    style={{...customStyle, ...styles.button}}
    labelStyle={{color}}
    loading={loading}
    onPress={onPress}
    {...rest}>
    {children}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    padding: 6,
  },
});
