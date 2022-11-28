import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../pages/HomePage.js';
import SearchPage from '../pages/SearchPage.js';
import ProductPage from '../pages/ProductPage.js';
import ReviewFeed from '../pages/ReviewPage.js';

const Stack = createStackNavigator();

export default function HomeNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Home" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Search" component={SearchPage}
                options={{
                    animationEnabled: false,
                }}
            />
            <Stack.Screen name="Product" component={ProductPage} />
            <Stack.Screen name="ReviewFeed" component={ReviewFeed} />
        </Stack.Navigator>
    );
}