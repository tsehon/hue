import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExplorePage from '../pages/ExplorePage.js';
import SearchPage from '../pages/SearchPage.js';
import ProductPage from '../pages/ProductPage.js';

const Stack = createNativeStackNavigator();

export default function ExploreNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Explore" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Explore" component={ExplorePage} />
            <Stack.Screen name="Search" component={SearchPage}
                options={{
                    animation: 'fade',
                }}
            />
            <Stack.Screen name="Product" component={ProductPage} />
        </Stack.Navigator>
    );
}