import Constants from 'expo-constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Login, Home, CreateProfile, Profile} from '~/screens';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import {navOptions} from '~/constants';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'Login',
    component: Login,
    options: {headerShown: false},
  },
  {
    name: 'Home',
    component: Home,
    options: {title: 'Doctors List', headerLeft: null},
  },
  {
    name: 'CreateProfile',
    component: CreateProfile,
    options: {title: 'Create Profile'},
  },
  {
    name: 'Profile',
    component: Profile,
    options: {title: 'Profile'},
  },
];

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        {Array.isArray(screens) &&
          screens.map(item => (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={{
                ...item.options,
                ...navOptions,
              }}
            />
          ))}
      </Stack.Navigator>
    </View>
  );
}

export default () => (
  <PaperProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </PaperProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
