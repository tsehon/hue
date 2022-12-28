import React, { useState } from 'react';
import { StyleSheet, Text, Button } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

import { getAuth, signOut } from 'firebase/auth';

export default function ProfilePage({ navigation, route }) {
    const auth = getAuth();

    return (
        <SafeAreaView style={styles.page}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <Text>You are logged in</Text>
            <Button
                onPress={() => navigation.navigate('AddProduct')}
                title='Add a product'
            />
            <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
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