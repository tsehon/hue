import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CameraPage from '../pages/CameraPage.js';
import UploadReviewPage from '../pages/UploadReviewPage.js';

const Stack = createNativeStackNavigator();

export default function CreateNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Camera" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Camera" component={CameraPage} />
            <Stack.Screen name="Upload" component={UploadReviewPage} />
        </Stack.Navigator>
    );
}