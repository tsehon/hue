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
            source={{ uri: props.item }}
        />
    );
})

export default function ReviewFeed({ navigation, route }) {
    const refs = useRef([])

    const onViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach(element => {
            const cell = refs.current[element.key];
            if (cell) {
                if (element.isViewable) cell.play();
                else cell.stop();
            }
        })
    })

    const array = [
        'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_2MB.mp4',
        'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_2MB.mp4',
        'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_2MB.mp4'
    ];
    // Should update height to dynamically get bottom tab bar height or smth
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height - 88 }}>
                <VideoSingle item={item} ref={VideoSingleRef => (refs.current[item] = VideoSingleRef)} />
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
                    itemVisiblePercentThreshold: 100,
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