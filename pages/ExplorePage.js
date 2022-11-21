import React, { useState } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomePageSection from '../components/HomePageSection';
import CategoryButton, { CategoryButtonScrollView } from '../components/CategoryButtons';
import CategoryButtonGrid from '../components/CategoryButtons';
import ProductButton, { ProductScrollView } from '../components/ProductDisplay';

export default function ExplorePage({ navigation, route }) {
    return (
        <SafeAreaView style={styles.page}>
            <ScrollView contentContainerStyle={styles.page}>
                <SearchBar
                    style={styles.searchbar}
                    onChangeText={(input) => {
                        navigation.navigate('Search', {
                            text: { input }
                        })
                    }}
                    placeholder="Search"
                    platform='ios'
                />
                <HomePageSection
                    title="Trending Reviews"
                >
                    <CategoryButtonGrid title="Beauty"></CategoryButtonGrid>
                </HomePageSection>
                <HomePageSection
                    title="Trending Products"
                >
                    <ProductScrollView>
                        <ProductButton title="Yeezy Boost"></ProductButton>
                        <ProductButton title="Logitech Monitor"></ProductButton>
                    </ProductScrollView>
                </HomePageSection>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
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