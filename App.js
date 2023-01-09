import { StyleSheet, View } from 'react-native';

import HomeNav from './nav/HomeNav';
import CreateNav from './nav/CreateNav';
import ExploreNav from './nav/ExploreNav';
import SavedNav from './nav/SavedNav';
import ProfileNav from './nav/ProfileNav';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/reducer';

import { Feather } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useCallback } from 'react';
import CommentModal from './components/CommentModal';

const Tab = createMaterialBottomTabNavigator();

/*
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});
*/

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default function MainDirectory() {
  const [fontsLoaded] = useFonts({
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
    <Provider store={store}>
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
            name="SavedNav"
            component={SavedNav}
            options={{
              tabBarLabel: "Saved",
              tabBarIcon: ({ color }) => (
                <Feather
                  name="bookmark"
                  size={24}
                  color={color}
                />
              )
            }}
          />
          <Tab.Screen
            name="ProfileNav"
            component={ProfileNav}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <Feather
                  name="user"
                  size={24}
                  color={color}
                />
              )
            }}
          />
        </Tab.Navigator>
        <CommentModal />
      </NavigationContainer>
    </Provider>
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

