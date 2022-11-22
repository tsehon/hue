import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Image, Text } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';


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

export default Thumbnail;