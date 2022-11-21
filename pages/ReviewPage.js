import { Video } from 'expo-av';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions } from 'react-native';

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

    const play = async() => {
        if (ref.current == null) return;
        const status = await ref.current.getStatusAsync();
        if (status?.isPlaying) return;
        try {
            await ref.current.playAsync();
        } catch(e) {
            console.log(e);
        }
    }
    const stop = async() => {
        if (ref.current == null) return;
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) return;
        try {
            await ref.current.stopAsync();
        } catch(e) {
            console.log(e);
        }
    }
    const unload = async() => {
        if (ref.current == null) return;
        try {
            await ref.current.unloadAsync();
        } catch(e) {
            console.log(e);
        }
    }


    return (
        <Video
            style={{flex: 1}}
            resizeMode='cover'
            shouldPlay={false}
            isLooping
            source={{uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
        />
    );
})

export default function ReviewFeed({ navigation }) {
    const refs = useRef([])

    const onViewableItemsChanged = useRef(({changed}) => {
        // these are never logged idk why this won't fire when scrolling
        console.log('hi')
        console.log(changed)
        changed.forEach(element => {
            console.log(refs.current)
            const cell = refs.current[element.key];
            console.log(cell)
            if (cell) {
                if (element.isViewable) cell.play();
                else cell.stop();
            }
        })
    })

    const array = [0,1,2,3,4,5,6];
    // Should update height to dynamically get bottom tab bar height or smth
    const renderItem = ({item, index}) => {
        console.log(refs)
        return (
            <View style={[{height: Dimensions.get('window').height-88}, index % 2 ? {backgroundColor: 'blue'} : {backgroundColor: 'red'}]}>
                <VideoSingle item={item} ref={VideoSingleRef => {
                    // console.log(refs);
                    // console.log(item);
                    // console.log(VideoSingleRef);
                    (refs.current[item] = VideoSingleRef)
                    }}/>
            </View>
        )
    }

    return (
        <View style={styles.page}>
            <FlatList
                data={array}
                windowSize={4}
                initialNumToRender={0}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 0,
                }}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={item => item}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
      },
});