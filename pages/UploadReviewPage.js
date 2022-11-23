import React, { useEffect, useState } from 'react'

import { StyleSheet } from "react-native";
import { Keyboard } from 'react-native';
import { ScrollView, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Stars from '../components/Stars';
import { Feather } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/native';

import db from '../config/firebase';
import { storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, collection, addDoc, updateDoc } from "firebase/firestore";
import CameraPage from './CameraPage';

const videosRef = ref(storage, 'videos');

export default function UploadReviewPage({ navigation, route }) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0.0);

    const [requestRunning, setRequestRunning] = useState(false);

    const handlePost = () => {
        console.log("handling post");

        if (route.params.source == null) {
            navigation.goBack();
            return;
        }

        postReview();
    }

    const postMedia = async (storageURI, media) => {
        const uploadRef = ref(storage, storageURI);

        fetch(media)
            .then(response =>
                response.blob()
            )
            .then(videoblob => {
                uploadBytesResumable(uploadRef, videoblob)
                videoblob.close();
            }).then(() => {
                console.log("............");
                console.log(".......");
                console.log("....");
                console.log("upload complete.");
            });
    }

    const postReview = async () => {
        setRequestRunning(true);
        const res = await addDoc(collection(db, "reviews"), {
            productName: productName,
            description: description,
            rating: rating,
        });

        const docRef = doc(db, "reviews", res.id);

        const videoURI = (String)(res.id) + ".mp4";
        await postMedia(videoURI, route.params.source);
        const video_download_url = await getDownloadURL(ref(storage, videoURI));

        if (route.params.sourceThumb) {
            const thumbnailURI = (String)(res.id) + ".jpg";
            await postMedia(thumbnailURI, route.params.sourceThumb)
            const thumbnail_download_url = await getDownloadURL(ref(storage, thumbnailURI));

            updateDoc(docRef, {
                videoDownloadURL: video_download_url,
                thumbnailDownloadURL: thumbnail_download_url,
            });
        } else {
            updateDoc(docRef, {
                videoDownloadURL: video_download_url,
            });
        }

        console.log("review posted with ID: " + res.id);
        setRequestRunning(false);

        navigation.goBack();
    }

    if (requestRunning) {
        return (
            <View style={styles.uploadingContainer}>
                <ActivityIndicator color='red' size='large' />
            </View>
        )
    }

    return (
        <ScrollView containerStyle={styles.container}>
            <View style={styles.topSpacer}>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.inputText}
                    maxLength={30}
                    onChangeText={(text) => setProductName(text.trim())}
                    placeholder="Product Name"
                />
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.inputText}
                    maxLength={150}
                    multiline
                    onChangeText={(text) => setDescription(text.trim())}
                    placeholder="Write your review"
                    onSubmitEditing={Keyboard.dismiss}
                />
                <Image
                    style={styles.mediaPreview}
                    source={{ uri: route.params.source }}
                />
            </View>
            <View style={styles.ratingBoxContainer}>
                <Text style={{ marginBottom: 1 }}> Rate {productName} </Text>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }, styles.star]}>
                    <Stars
                        rating={rating}
                        starSize={50}
                        disabled={false}
                        alignSelf={'flex-end'}
                    />
                </View>
            </View>
            <View style={styles.tagBoxContainer}>
                <Text style={{ marginBottom: 10 }}> Tags </Text>
                <ScrollView horizontal containerStyle={styles.tagsContainer}>
                    <TouchableOpacity
                        style={styles.tag}>
                        <Text style={styles.tagText}>fragile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tag}>
                        <Text style={styles.tagText}>smears</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tag}>
                        <Text style={styles.tagText}>tag 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tag}>
                        <Text style={styles.tagText}>tag 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tag}>
                        <Text style={styles.tagText}>tag 5</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.formContainer}>
                <Text> Brand </Text>
            </View>
            <View style={styles.formContainer}>
                <Text> Category </Text>
            </View>
            <View style={styles.formContainer}>
                <Text> Link </Text>
            </View>
            <View style={styles.spacer}
                onClick={() => null}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.cancelButton}>
                    <Feather name="x" size={24} color="black" />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handlePost()}
                    style={styles.postButton}>
                    <Feather name="corner-left-up" size={24} color="white" />
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white'
    },
    uploadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spacer: {
        flex: 1,
    },
    topSpacer: {
        padding: 20,
        flexDirection: 'row',
    },
    formContainer: {
        padding: 20,
        flexDirection: 'row',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    tagBoxContainer: {
        padding: 20,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    ratingBoxContainer: {
        padding: 20,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    tagsContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        marginVertical: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        margin: 20,
    },
    inputText: {
        paddingVertical: 10,
        marginRight: 20,
        flex: 1
    },
    mediaPreview: {
        aspectRatio: 9 / 16,
        backgroundColor: 'black',
        width: 60
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: 'darkgrey',
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 30,
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderRadius: 10,
    },
    star: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    cancelButton: {
        alignItems: 'center',
        flex: 1,
        borderColor: 'lightgray',
        borderWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    postButton: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ff4040',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    tagText: {
        marginLeft: 5,
        color: 'white',
        fontSize: 16
    },
    cancelButtonText: {
        marginLeft: 5,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16
    },
    postButtonText: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});