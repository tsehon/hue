import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage.js';
import SearchPage from '../pages/SearchPage.js';
import ProductPage from '../pages/ProductPage.js';

const Stack = createNativeStackNavigator();

export default function HomeNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Home" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Search" component={SearchPage}
                options={{
                    animation: 'fade',
                }}
            />
            <Stack.Screen name="Product" component={ProductPage} />
        </Stack.Navigator>
    );
}