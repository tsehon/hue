import { StyleSheet, View } from 'react-native';

import HomeNav from './nav/HomeNav';
import CreateNav from './nav/CreateNav';
import ExploreNav from './nav/ExploreNav';
import ReviewFeed from './pages/ReviewPage';

import { Feather } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import  { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useCallback } from 'react';

const Tab = createMaterialBottomTabNavigator();

export default function MainDirectory() {
  const [fontsLoaded] = useFonts({
    'Plus-Jakarta-Sans': require('./assets/fonts/Plus-Jakarta-Sans.ttf'),
    'PlusJakartaSans-Bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
    'PlusJakartaSans-ExtraBold': require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'PlusJakartaSans-BoldItalic': require('./assets/fonts/PlusJakartaSans-BoldItalic.ttf'),
    'PlusJakartaSans-ExtraBoldItalic': require('./assets/fonts/PlusJakartaSans-ExtraBoldItalic.ttf'),
    'PlusJakartaSans-ExtraLight': require('./assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
    'PlusJakartaSans-ExtraLightItalic': require('./assets/fonts/PlusJakartaSans-ExtraLightItalic.ttf'),
    'PlusJakartaSans-Italic': require('./assets/fonts/PlusJakartaSans-Italic.ttf'),
    'PlusJakartaSans-Light': require('./assets/fonts/PlusJakartaSans-Light.ttf'),
    'PlusJakartaSans-LightItalic': require('./assets/fonts/PlusJakartaSans-LightItalic.ttf'),
    'PlusJakartaSans-Medium': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-MediumItalic': require('./assets/fonts/PlusJakartaSans-MediumItalic.ttf'),
    'PlusJakartaSans-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-SemiBold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'PlusJakartaSans-SemiBoldItalic': require('./assets/fonts/PlusJakartaSans-SemiBoldItalic.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer onReady={onLayoutRootView}>
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
          name="HomeNav"
          component={HomeNav}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Feather
                name="home"
                size={24}
                color={color}
              />
            )
          }}
        />
        <Tab.Screen
          name="CreateNav"
          component={CreateNav}
          options={{
            tabBarLabel: "Create",
            tabBarIcon: ({ color }) => (
              <Feather
                name="plus-square"
                size={24}
                color={color}
              />
            )
          }}
        />
        <Tab.Screen
          name="ExploreNav"
          component={ExploreNav}
          options={{
            tabBarLabel: "Explore",
            tabBarIcon: ({ color }) => (
              <Feather
                name="search"
                size={24}
                color={color}
              />
            )
          }}
        />
        <Tab.Screen
          name="ReviewFeed"
          component={ReviewFeed}
          options={{
            tabBarLabel: "Reviews",
            tabBarIcon: ({ color }) => (
              <Feather
                name="search"
                size={24}
                color={color}
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

