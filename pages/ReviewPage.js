import { Video } from 'expo-av';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { getDocs, collection, where, query } from "firebase/firestore";
import db from '../config/firebase';

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
export default function ReviewFeed( { route } ) {
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
                <VideoSingle item={item} ref={VideoSingleRef => (refs.current[item.id] = VideoSingleRef)} />
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
            />
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
        <Video
            ref={ref}
            style={{ flex: 1 }}
            resizeMode='cover'
            shouldPlay={false}
            isLooping
            source={{ uri: props.item.videoDownloadURL }}
        />
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
});