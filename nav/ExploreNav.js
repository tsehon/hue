import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ExplorePage from '../pages/ExplorePage.js';
import SearchPage from '../pages/SearchPage.js';
import ProductPage from '../pages/ProductPage.js';
import ReviewFeed from '../pages/ReviewPage.js';

const Stack = createStackNavigator();

export default function ExploreNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Explore" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Explore" component={ExplorePage} />
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