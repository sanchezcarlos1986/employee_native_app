import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {theme} from '~/constants';

export default ({label, placeholder, value, onChangeText, ...rest}) => (
  <TextInput
    label={label || ''}
    selectionColor={theme.colors.primary}
    underlineColor={theme.colors.accent}
    placeholder={placeholder || ''}
    value={value || ''}
    style={styles.inputStyle}
    theme={theme}
    onChangeText={text => onChangeText(text)}
    {...rest}
  />
);

const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: 5,
    backgroundColor: 'white',
  },
});
