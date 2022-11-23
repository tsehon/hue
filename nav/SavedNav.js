import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SavedPage from '../pages/SavedPage';

const Stack = createNativeStackNavigator();

export default function SavedNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Saved" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Saved" component={SavedPage} />
        </Stack.Navigator>
    );
}