import Constants from 'expo-constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Home, CreateEmployee, Profile} from '~/screens';
import {createStackNavigator} from '@react-navigation/stack';

import {navOptions} from '~/constants';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'Home',
    component: Home,
    options: {title: 'Home'},
  },
  {
    name: 'CreateEmployee',
    component: CreateEmployee,
    options: {title: 'Create Employee Profile'},
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
  <NavigationContainer>
    <App />
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
