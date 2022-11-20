import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainDirectory from './pages/MainDirectory.js';
import HomePage from './pages/HomePage.js';
import SearchPage from './pages/SearchPage.js';
import CameraPage from './pages/CameraPage.js';
import ProductPage from './pages/ProductPage.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          initialRouteName='MainDirectory'>
        <Stack.Screen name="MainDirectory" component={MainDirectory} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Camera" component={CameraPage} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchPage} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={ProductPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 60,
  },
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbar: {
    paddingHorizontal: 10,
    flex: 2
  },
  feed: {
    flex: 4,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
