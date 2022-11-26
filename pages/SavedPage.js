import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

export default function SavedPage({ navigation, route }) {
    return (
        <SafeAreaView style={styles.page}>
            <FocusAwareStatusBar barStyle='dark-content'/>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
});