import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CameraPage from '../pages/CameraPage.js';
import UploadReviewPage from '../pages/UploadReviewPage.js';
import UploadReviewSearch from '../components/UploadReviewSearch.js';
import AddProduct from '../components/AddProduct.js';

const Stack = createStackNavigator();

export default function CreateNav({ navigation, route }) {
    return (
        <Stack.Navigator
            initialRouteName="Camera" screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Camera" component={CameraPage} />
            <Stack.Screen name="Upload" component={UploadReviewPage} />
            <Stack.Screen name="UploadSearch" component={UploadReviewSearch} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
        </Stack.Navigator>
    );
}