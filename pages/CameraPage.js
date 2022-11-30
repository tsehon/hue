import React, { useEffect, useState } from 'react'

import { Camera } from 'expo-camera';
import { Audio } from 'expo-av'
import { StyleSheet, Vibration } from 'react-native';

import { View, Text, TouchableOpacity, Image } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import * as VideoThumbnails from 'expo-video-thumbnails';

import CircularProgress from 'react-native-circular-progress-indicator';

import { CurrentRenderContext, useIsFocused } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

let lastPress = 0;

export default function CameraPage({ navigation, route }) {

    const [video, setVideo] = useState(null);

    const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);

    const [galleryItems, setGalleryItems] = useState([]);

    const [cameraRef, setCameraRef] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);

    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setHasCameraPermissions(cameraStatus.status == 'granted')

            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status == 'granted')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')

            if (galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
                setGalleryItems(userGalleryMedia.assets)
            }
        })()
    }, [])

    // flip the camera on a double tap
    const handleClick = (event) => {
        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
        }
        lastPress = time;
    };

    const recordVideo = async () => {
        if (cameraRef) {
            setIsRecording(true);
            try {
                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['720p'] }
                const videoRecordPromise = cameraRef.recordAsync(options)

                if (videoRecordPromise) {
                    const data = await videoRecordPromise;

                    const source = data.uri
                    const sourceThumb = await generateThumbnail(source)

                    console.log('video at' + source);
                    console.log('thumbnail at ' + sourceThumb);
                    console.log('navigating to upload page.');
                    navigation.navigate('Upload', { source, sourceThumb })

                    setIsRecording(false);
                }
            } catch (error) {
                console.warn(error)
            }
        }
    }

    const stopVideo = async () => {
        if (cameraRef) {
            cameraRef.stopRecording()
        }
    }

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        });

        console.log(result);

        if (!result.canceled) {
            setVideo(result.assets[0].uri);
            const source = result.assets[0].uri;
            const sourceThumb = await generateThumbnail(video);

            console.log('video at' + source);
            console.log('thumbnail at ' + sourceThumb);
            console.log('navigating to upload page.');

            navigation.navigate('Upload', { source, sourceThumb });
        }
    }

    const generateThumbnail = async (source) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                source,
                {
                    time: 10,
                }
            );
            return uri;
        } catch (e) {
            console.warn(e);
        }
    };

    if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
        return (
            <View></View>
        )
    }



    return (
        <View style={styles.container}
            onStartShouldSetResponder={(event) => handleClick(event)}
        >
            <FocusAwareStatusBar barStyle='light-content' />
            {isFocused ?
                <Camera
                    ref={ref => setCameraRef(ref)}
                    onCameraReady={() => setIsCameraReady(true)}
                    defaultVideoQuality={Camera.Constants.VideoQuality['480p']}
                    style={styles.camera}
                    ratio={'16:9'}
                    type={cameraType}
                    flashMode={cameraFlash}
                />
                :
                null
            }
            <View style={styles.sideBarContainer}>
                <TouchableOpacity
                    style={styles.sideBarButton}
                    onPress={() => setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>

                    <Feather name="refresh-ccw" size={24} color={'white'} />
                    <Text style={styles.iconText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.sideBarButton}
                    onPress={() => setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)}>

                    <Feather name="zap" size={24} color={'white'} />
                    <Text style={styles.iconText}>Flash</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.bottomBarContainer}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.recordButtonContainer}>
                    <TouchableOpacity
                        disabled={!isCameraReady}
                        onLongPress={() => recordVideo()}
                        onPressOut={() => stopVideo()}
                        style={{ zIndex: 3 }}
                    >
                        {isRecording ?
                            <View style={styles.recordButtonSubcontainer}
                            >
                                <View style={styles.recordButtonWhenOn} />
                                <View style={styles.progressBar}>
                                    <CircularProgress
                                        value={60}
                                        maxValue={60}
                                        initialValue={0}
                                        radius={55}
                                        activeStrokeWidth={10}
                                        inActiveStrokeWidth={10}
                                        duration={60000}
                                        onAnimationComplete={() => stopVideo()}
                                        progressValueColor="transparent"
                                        inActiveStrokeOpacity={0.3}
                                        activeStrokeColor="#ff0000"
                                        activeStrokeSecondaryColor="#ff000055"
                                        /*
                                        strokeLinecap='butt'
                                        inActiveStrokeColor="black"
                                        dashedStrokeConfig={{
                                            count: 60,
                                            width: 4,
                                        }}
                                        */
                                    />
                                </View>
                            </View>
                            :
                            <View style={styles.recordButtonSubcontainer}>
                                <View style={styles.recordButtonOff}/>
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => pickFromGallery()}
                        style={styles.galleryButton}>
                        {galleryItems[0] == undefined ?
                            <></>
                            :
                            <Image
                                style={styles.galleryButtonImage}
                                source={{ uri: galleryItems[0].uri }}
                            />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        backgroundColor: 'black',
        aspectRatio: 9 / 16,
    },
    bottomBarContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        marginBottom: 30,
    },
    recordButtonContainer: {
        flex: 1,
        marginLeft: 30,
        marginBottom: 20,
    },
    recordButtonSubcontainer: {
        flex: 1,
        height: 70,
        marginLeft: 10,
        width: 70,
        zIndex: 1,
    },
    recordButtonWhenOn: {
        alignSelf: 'center',
        zIndex: 2,
        borderWidth: 8,
        borderColor: '#ff000022',
        backgroundColor: '#ff000033',
        borderRadius: 100,
        height: 85,
        width: 85,
        top: -5,
        alignSelf: 'center',
    },
    progressBar: {
        alignSelf: 'center',
        top: -102,
        zIndex: 1,
    },
    recordButtonOff: {
        borderWidth: 8,
        borderColor: '#ff000099',
        backgroundColor: '#ff0000aa',
        borderRadius: 100,
        height: 85,
        width: 85,
        top: -5,
        alignSelf: 'center',
    },
    galleryButton: {
        marginLeft: 20,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        width: 50,
        height: 50,
    },
    galleryButtonImage: {
        width: 50,
        height: 50,
    },
    sideBarContainer: {
        top: 60,
        right: 0,
        marginHorizontal: 20,
        position: 'absolute'
    },
    iconText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5
    },
    sideBarButton: {
        alignItems: 'center',
        marginBottom: 25
    }
});