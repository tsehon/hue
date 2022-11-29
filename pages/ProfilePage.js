import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

export default function ProfilePage({ navigation, route }) {
    return (
        <SafeAreaView style={styles.page}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <Button
                onPress={() => navigation.navigate('AddProduct')}
                title='Add a product'
            />
        </SafeAreaView >
  );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});