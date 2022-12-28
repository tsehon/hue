import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

const Stack = createStackNavigator();

export default function AuthNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="SignInPage" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Sign In" component={SignInPage} />
            <Stack.Screen name="Sign Up" component={SignUpPage} />
        </Stack.Navigator>
    );
}