import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { StyleSheet } from 'react-native';

import MainPage from './HomePage.js';
import CameraPage from './CameraPage.js';
import ExplorePage from './ExplorePage.js';

import { Feather } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export default function MainDirectory() {
    return (
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
                name="Camera"
                component={CameraPage}
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
                name="Explore"
                component={ExplorePage}
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

