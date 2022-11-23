import * as React from 'react';
import { StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfilePage from '../pages/ProfilePage.js';
import ReviewFeed from '../pages/ReviewPage.js';

const Stack = createNativeStackNavigator();

export default function ProfileNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Reviews" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Reviews" component={ReviewFeed} />
            <Stack.Screen name="Profile" component={ProfilePage} />
        </Stack.Navigator>
    );
}