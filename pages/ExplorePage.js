import React, { useState, useEffect, useRef } from 'react';
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
import { ref } from 'firebase/storage';

export default function ExplorePage({ navigation, route }) {
    const searchRef = useRef(null);

    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [itemDict, setItemDict] = useState({});

    return (
        <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
            <FocusAwareStatusBar barStyle='dark-content' />
            <ScrollView>
                <SearchBar
                    ref={searchRef}
                    style={styles.searchbar}
                    onPressIn={() => navigation.navigate('Search')}
                    onFocus={() => searchRef.current.blur()}
                    placeholder="Search"
                    platform='ios'
                />
                <HomePageSection
                    title="Trending Reviews"
                >
                    <ScrollView horizontal>
                        <VideoPreview
                            style={{ width: 137, height: 222, borderRadius: 10 }}
                            navigation={navigation}
                            searchType='categoryName'
                            searchQuery='Beauty'
                            firstID='gEe9D6F5Fh9FrZmV8oxk'
                            videoURI='https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/gEe9D6F5Fh9FrZmV8oxk.mp4?alt=media&token=0b0a2983-d79c-4ed9-bdf4-ffa3c23ccf1b'
                        />
                        <VideoPreview
                            style={{ width: 137, height: 222, borderRadius: 10, marginLeft: 10 }}
                            navigation={navigation}
                            searchType='categoryName'
                            searchQuery="Skincare"
                            firstID='jgsVTxXpy6QednIM9GX2'
                            videoURI='https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/jgsVTxXpy6QednIM9GX2.mp4?alt=media&token=2ebc4fb9-312c-49b7-850e-cb79023c96b3'
                        />
                        <VideoPreview
                            style={{ width: 137, height: 222, borderRadius: 10, marginLeft: 10 }}
                            navigation={navigation}
                            searchType='categoryName'
                            searchQuery='Beauty'
                            firstID='uzjDRJ2kZWq4bswDffVl'
                            videoURI='https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/uzjDRJ2kZWq4bswDffVl.mp4?alt=media&token=04dff38e-abcb-4f09-b412-3678fb89422b'
                        />
                        <VideoPreview
                            style={{ width: 137, height: 222, borderRadius: 10, marginLeft: 10 }}
                            navigation={navigation}
                            searchType='categoryName'
                            searchQuery='Tech'
                            firstID='nwymyYw2zIWWml7KFUXB'
                            videoURI='https://firebasestorage.googleapis.com/v0/b/lavalab-hue.appspot.com/o/nwymyYw2zIWWml7KFUXB.mp4?alt=media&token=ab4f60a3-d5d2-4d0e-baf8-ee41e80326a7'
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