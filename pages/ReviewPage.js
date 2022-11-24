import { Video } from 'expo-av';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Text } from 'react-native';
import { getDocs, collection, where, query } from "firebase/firestore";
import db from '../config/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import ReadMore from '@fawazahmed/react-native-read-more';

import BackButton from '../components/BackButton';
import Stars from '../components/Stars';

/**
 * 
 * @param {integer} startIndex - The video at which to start the feed scrolled to
 * (if 3 was passed in, the user would see video 3 first, with the option) to scroll up to video 2 or down to video 4, etc.
 * @param {string} searchType - Which Firebase review property to search by (productName, category, etc.)
 * @param {string} searchQuery - The query to search Firebase with (pulling all data where searchType contents == searchQuery)
 * @param {string} firstID - A specific review ID from the query results to put at the front of the data array
 * Unlike with startIndex, the firstID video will be the very first item in the FlatList
 * @returns 
 */
export default function ReviewFeed( { route, navigation } ) {
    const [videos, setVideos] = useState([]);
    const flatListRef = useRef(null);
    const refs = useRef([]);

    const vidHeight = Dimensions.get('window').height - 88;

    useEffect(() => {
        getFeed(route.params.searchType, route.params.searchQuery, route.params.firstID).then(setVideos);
    }, []);

    const onViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach(element => {
            const cell = refs.current[element.key];
            if (cell) {
                if (element.isViewable) cell.play();
                else cell.stop();
            }
        })
    })

    // Should update height to dynamically get bottom tab bar height or smth
    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, height: vidHeight }}>
                <VideoSingle item={item} ref={VideoSingleRef => (refs.current[item.id] = VideoSingleRef)} navigation={navigation} />
            </View>
        )
    }

    return (
        <View style={styles.page}>
            <FlatList
                ref={flatListRef}
                getItemLayout={(data, index) => (
                    {length: vidHeight, offset: vidHeight * index, index}
                  )}
                initialScrollIndex={(typeof route.params.startIndex != 'undefined') ? route.params.startIndex : null}
                data={videos}
                windowSize={4}
                initialNumToRender={0}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100,
                }}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={item => item.id}
                onViewableItemsChanged={onViewableItemsChanged.current}
                showsVerticalScrollIndicator={false}
            />
            <SafeAreaView style={[styles.absolute, styles.topmostButtons]}>
                <BackButton navigation={navigation}/>
                <TouchableOpacity
                    style={[styles.button, {paddingTop: 6, paddingRight: 12}]}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Ionicons 
                        name="search"
                        size={32}
                        color="white"
                    />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const VideoSingle = forwardRef((props, parentRef) => {
    const ref = useRef(null);
    useImperativeHandle(parentRef, () => ({
        play,
        stop,
        unload,
    }));

    useEffect(() => {
        return () => unload();
    }, [])

    const play = async () => {
        if (ref.current == null) return;
        const status = await ref.current.getStatusAsync();
        if (status?.isPlaying) return;
        try {
            await ref.current.playAsync();
        } catch (e) {
            console.log(e);
        }
    }
    const stop = async () => {
        if (ref.current == null) return;
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) return;
        try {
            await ref.current.stopAsync();
        } catch (e) {
            console.log(e);
        }
    }
    const unload = async () => {
        if (ref.current == null) return;
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.page}>
            <Video
                ref={ref}
                style={styles.page}
                resizeMode='cover'
                shouldPlay={false}
                isLooping
                source={{ uri: props.item.videoDownloadURL }}
            />
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 10, paddingBottom: 15}}>
                <View style={{position: 'absolute', right: 0, bottom: 90, padding: 10, alignItems: 'center'}}>
                    <Feather name='thumbs-up' size={28} color='white'/>
                    <Text style={[styles.text, {fontSize: 12}]}>{props.item.upvotes}</Text>
                    <Feather name='thumbs-down' size={28} color='white' style={{marginTop: 20}}/>
                    <Text style={[styles.text, {fontSize: 12}]}>{props.item.downvotes}</Text>
                    <Feather name='bookmark' size={28} color='white' style={{marginTop: 20}}/>
                </View>
                <Text style={[styles.text, {fontSize: 16}]}>{props.item.userName}</Text>
                <Text
                    // Reviews don't currently include the corresponding product ID
                    // onPress={() => props.navigation.navigate('Product', {productId: props.item.productID})}
                    style={[styles.text, {fontSize: 20, marginBottom: 9, marginTop: 11}]}
                >
                    {props.item.productName}
                </Text>
                <View style={styles.flexRow}>
                    <Stars
                        rating={props.item.rating}
                        starSize={16}
                        color='white'
                        style={{alignSelf: 'center', marginLeft: -6, marginRight: -6, paddingRight: 7}}
                        alignSelf='center'
                        marginSubtract={-5}
                    />
                    <Text style={[styles.text, {fontSize: 16}]}>{props.item.rating}</Text>
                </View>
                <ReadMore
                    style={[styles.text, {fontSize: 16, marginTop: 24}]}
                    numberOfLines={2}
                    seeMoreText='more'
                    seeMoreStyle={styles.moreLess}
                    seeLessText='less'
                    seeLessStyle={styles.moreLess}
                    debounceSeeMoreCalc={1}
                >
                    {props.item.description}
                </ReadMore>
            </View>
        </View>
    );
})

const getFeed = async (type, searchTerm, firstID) => {
    // type should be 'productName' or 'category' or later some tags implementation
    const q = query(collection(db, 'reviews'), where(type, '==', searchTerm));

    const querySnapshot = await getDocs(q);

    const arr = [];

    querySnapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();
        if (typeof firstID != 'undefined' && id == firstID) arr.unshift({id, ...data});
        else arr.push({id, ...data});
    });
    return arr;
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    absolute: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    topmostButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        fill: 1,
    },
    text: {
        color: 'white',
        fontFamily: 'Plus-Jakarta-Sans',
    },
    moreLess: {
        color: '#B3B3B3',
        fontFamily: 'Plus-Jakarta-Sans',
    }
});