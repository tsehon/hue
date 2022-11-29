import * as React from 'react';
import { StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfilePage from '../pages/ProfilePage.js';
import ReviewFeed from '../pages/ReviewPage.js';
import AddProduct from '../components/AddProduct.js';

const Stack = createNativeStackNavigator();

export default function ProfileNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Profile" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
        </Stack.Navigator>
    );
}