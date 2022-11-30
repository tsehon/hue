import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

export default function SavedPage({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <Text style={styles.title}>Coming Soon</Text>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'PlusJakartaSans-SemiBold',
        alignSelf: 'center'
    },
    container: {
        padding: 100,
    }
});