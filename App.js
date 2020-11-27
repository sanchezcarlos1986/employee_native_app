import Constants from 'expo-constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Home, CreateEmployee, Profile} from '~/screens';

export default function App() {
  return (
    <View style={styles.container}>
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});
