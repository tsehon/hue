import { StyleSheet } from 'react-native';

import HomeNav from './nav/HomeNav';
import CreateNav from './nav/CreateNav';
import ExploreNav from './nav/ExploreNav';

import { Feather } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function MainDirectory() {
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

