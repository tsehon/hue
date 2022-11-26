import { Video } from 'expo-av';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Text } from 'react-native';
import { getDocs, collection, where, query, doc, updateDoc, getDoc, orderBy } from "firebase/firestore";
import db from '../config/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import ReadMore from '@fawazahmed/react-native-read-more';

import BackButton from '../components/BackButton';
import Stars from '../components/Stars';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

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
            <FocusAwareStatusBar barStyle='light-content'/>
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
                <BackButton navigation={navigation} color='white' size={48}/>
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
    const docRef = doc(db, 'reviews', props.item.id);
    const [upvotes, setUpvotes] = useState(props.item.upvotes);
    const [downvotes, setDownvotes] = useState(props.item.downvotes);
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [saved, setSaved] = useState(false);

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

    // Should use the existing firestore increment functionality but I simply cannot get it working
    // This could probably still get confused if a lot of users are voting at the same time
    const increment = async(item, incrementVal) => {
        // Fetch the most recent number of up/downvotes, as it could have been up/downvoted by other
        // users since the page was loaded and we don't want to lose their votes
        const docSnap = await getDoc(docRef);
        const mostRecent = docSnap.data()[item];
        const newVal = mostRecent+incrementVal;
        await updateDoc(docRef, {[item]: newVal});
        if (item == 'upvotes') {
            await updateDoc(docRef, {upvotesMinusDownvotes: newVal-docSnap.data().downvotes});
        } else if (item == 'downvotes') {
            setDownvotes(newVal);
            await updateDoc(docRef, {upvotesMinusDownvotes: docSnap.data().upvotes-downvotes});
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
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, padding: 10, paddingBottom: 15, paddingRight: 45}}>
                <View style={{position: 'absolute', right: 0, bottom: 90, padding: 10, alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => {
                            if (!upvoted) {
                                setUpvotes(upvotes+1); // This is just the user-side display of upvote count, so it's okay to separate from actual database value
                                increment('upvotes', 1);
                                setUpvoted(true);
                            } else {
                                setUpvotes(upvotes-1);
                                increment('upvotes', -1);
                                setUpvoted(false);
                            }
                        }}
                        style={{alignItems: 'center'}}
                    >
                        <MaterialIcons name={upvoted ? 'thumb-up-alt' : 'thumb-up-off-alt'} size={28} color='white' iconStyle={{backgroundColor: 'white'}}/>
                        <Text style={[styles.text, {fontSize: 12}]}>{upvotes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (!downvoted) {
                                setDownvotes(downvotes+1);
                                increment('downvotes', 1);
                                setDownvoted(true);
                            } else {
                                setDownvotes(downvotes-1);
                                increment('downvotes', -1);
                                setDownvoted(false);
                            }
                        }}
                        style={{marginTop: 20, alignItems: 'center'}}
                    >
                        <MaterialIcons name={downvoted ? 'thumb-down-alt': 'thumb-down-off-alt'} size={28} color='white'/>
                        <Text style={[styles.text, {fontSize: 12}]}>{downvotes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        if (!saved) setSaved(true);
                        else setSaved(false);
                    }}
                        style={{marginTop: 20, alignItems: 'center'}}
                    >
                        <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={28} color='white'/>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.text, {fontSize: 16}]}>{props.item.userName}</Text>
                <Text
                    // Reviews don't currently include the corresponding product ID
                    // onPress={() => props.navigation.navigate('Product', {productId: props.item.productID})}
                    style={[styles.text, {fontSize: 20, marginBottom: 9, marginTop: 11}]}
                    numberOfLines={2}
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
    let q;
    if (type == 'productName') q = query(collection(db, 'reviews'), where(type, '==', searchTerm), orderBy('upvotesMinusDownvotes', 'desc'));
    else q = query(collection(db, 'reviews'), where(type, '==', searchTerm));

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