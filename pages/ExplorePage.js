import React, { useState } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function ExplorePage({ navigation, route }) {
    return (
        <ScrollView contentContainerStyle={styles.page}>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingTop: 20,
    },
    container: {
        padding: 30,
        flex: 1,
        backgroundColor: 'lightblue',
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    feed: {
        flex: 4,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
    },
});