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
            <FocusAwareStatusBar barStyle='dark-content'/>
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
                            style={{width: 137, height: 222, borderRadius: 10}}
                            navigation={navigation}
                            searchType='categoryName'
                            searchQuery='Beauty'
                            firstID='MXILb6SdiK9Sq5ZjIzZU'
                            videoURI='https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_2MB.mp4'
                        />
                        <VideoPreview
                            style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
                            navigation={navigation}
                            searchType='categoryName'
                            searchQuery='Beauty'
                            firstID='2DtUlonFdbiimC0LNB18'
                            videoURI='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4'
                        />
                        <VideoPreview
                            style={{width: 137, height: 222, borderRadius: 10, marginLeft: 10}}
                            navigation={navigation}
                            searchType='categoryName'
                            searchQuery='Beauty'
                            firstID='izG3zce88U4wsXUvBqFM'
                            videoURI='https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4'
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