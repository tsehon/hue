import React, { useState, useEffect } from 'react';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomePageSection from '../components/HomePageSection';
import CategoryButton, { CategoryButtonScrollView } from '../components/CategoryButtons';
import CategoryButtonGrid from '../components/CategoryButtons';
import ProductButton, { ProductScrollView } from '../components/ProductDisplay';
import ReviewButton, { ReviewScrollView } from '../components/ReviewDisplay';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ProductsList from '../components/ProductsList';
import VideoPreview from '../components/VideoPreviews';

import { collection, getDocs } from "firebase/firestore";

export default function ExplorePage({ navigation, route }) {
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [itemDict, setItemDict] = useState({});

    return (
        <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <ScrollView>
                <SearchBar
                    style={styles.searchbar}
                    onPressIn={() => navigation.navigate('Search')}
                    placeholder="Search"
                    platform='ios'
                />
                <HomePageSection
                    title="Trending Reviews"
                >
                    <ScrollView horizontal>
                        <VideoPreview
                            style={{width: 137, height: 222, borderRadius: 10}}
                            navigation={navigation}
                            searchType='categoryName'
                            searchQuery='Beauty'
                            firstID='MXILb6SdiK9Sq5ZjIzZU'
                            videoURI='https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_2MB.mp4'
                        />
                    </ScrollView>
                </HomePageSection>
                <HomePageSection
                    title="Trending Products"
                >
                    <ProductsList
                        navigation={navigation}
                        products={[
                        'g8CN9lm5cxXeZ1BhwYN2',
                        'M9CDo9l429QwsrzCepYv',
                        'X0J19ZzbHByWJHBGMzzv',
                        'OBbjTcEtoglR2IdMAjna',
                        ]}
                    />
                </HomePageSection>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
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