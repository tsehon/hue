import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

import { getAuth, signOut } from 'firebase/auth';
import getDisplayName from '../services/getDisplayName';
import styles from '../styles/styles';



export default function ProfilePage({ navigation, route }) {
    const auth = getAuth();
    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        async function getName() {setDisplayName(await getDisplayName(auth.currentUser.uid))};
        getName();
    }, [])

    return (
        <SafeAreaView style={[styles.page, styles.centered]}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <Text>You are logged in as @{displayName}</Text>
            <Button
                onPress={() => navigation.navigate('AddProduct')}
                title='Add a product'
            />
            <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth)} />
        </SafeAreaView >
  );
}
