import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Image, Text, TouchableOpacity } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';


export default function VideoPreview(props) {
    return (
        <TouchableOpacity
            style={props.style}
            onPress={() => {
                props.navigation.push('ReviewFeed', {
                    startIndex: props.startIndex,
                    searchType: props.searchType,
                    searchQuery: props.searchQuery,
                    firstID: props.firstID,
                });
            }}
        >
            <Thumbnail
                style={props.style}
                uri={props.uri}
            />
        </TouchableOpacity>
    )
}

// Pass in video uri as a prop and this will return a thumbnail of the video
// Pass in style as prop
const Thumbnail = (props) => {
    const [image, setImage] = useState(null);
    const [viduri, setVidUri] = useState(null);

    useEffect(() => {
        setVidUri(props.uri);
        if (image == null && viduri != null) generateThumbnail();
    });

    const generateThumbnail = async () => {
    try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(
        viduri, { time: 1000, }
        );
        setImage(uri);
    } catch (e) {
        console.warn(e);
    }
    };

    return (
            <Image source={{ uri: image }} style={props.style} />
      );
}