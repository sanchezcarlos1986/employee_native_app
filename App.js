import Constants from 'expo-constants';
console.log('Constants:', Constants);
import React from 'react';
import {StyleSheet, View} from 'react-native';
// import Home from '~/screens/Home';
import CreateEmployee from '~/screens/CreateEmployee';

export default function App() {
  return (
    <View style={styles.container}>
      <CreateEmployee />
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
