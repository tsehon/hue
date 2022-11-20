import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchPage from './SearchPage.js';
import ProductPageRoute from './ProductPageRoute.js';

const Stack = createNativeStackNavigator();

export default function SearchPageNav({navigation, route}) {
    return (
        <Stack.Navigator
            initialRouteName="Search" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Search" component={SearchPage} />
            <Stack.Screen name="Product" component={ProductPageRoute} />
        </Stack.Navigator>
      );
}