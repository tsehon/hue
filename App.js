import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, View, ScrollView } from 'react-native';

import MainPage from './pages/MainPage.js';
import SearchPage from './pages/SearchPage.js';
import CameraPage from './pages/CameraPage.js';

import { Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

        }}
        backBehavior={{
          initialRoute: "home",
        }}
        initialRouteName="Home"
        barStyle={{ backgroundColor: 'white' }}
      >
        <Tab.Screen
          name="Home"
          component={MainPage}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <Feather
                name="home"
                size={24}
                color={color}
                style={{ height: 40, paddingTop: 5 }}
              />
            )
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraPage}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <Feather
                name="plus-square"
                size={24}
                color={color}
                style={{ height: 40, paddingTop: 5 }}
              />
            )
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchPage}
          options={{
            tabBarLabel: null,
            tabBarIcon: ({ color }) => (
              <Feather
                name="search"
                size={24}
                color={color}
                style={{ height: 40, paddingTop: 5 }}
              />
            )
          }}
        />
      </Tab.Navigator>
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
