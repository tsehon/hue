import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function SavedPage({ navigation, route }) {
    return (
        <SafeAreaView style={styles.page}>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
});