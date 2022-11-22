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
    const [reviewID, setReviewID] = useState('');

    const [videoURI, setVideoURI] = useState(null);
    const [videoDownloadURL, setVideoDownloadURL] = useState(null);

    const [requestRunning, setRequestRunning] = useState(false);

    const handlePost = () => {
        setVideoURI(route.params.source);
        console.log("handling post");

        if (route.params.source == null) {
            navigation.goBack();
            return;
        }

        setRequestRunning(true);
        postReview();
        setRequestRunning(false);

        navigation.navigate('Camera');
    }

    const postVideo = (id) => {
        const video = route.params.source;
        console.log("video URI: " + video);
        console.log("posting video...");

        const storageURI = (String)(id) + ".mp4";
        console.log("to be stored at : " + storageURI);

        const uploadRef = ref(storage, storageURI);

        const metadata = {
            productName: { productName },
            description: { description },
            rating: { rating }
        }

        const uploadTask = uploadBytesResumable(uploadRef, video, metadata);
        console.log("uploading...");

        uploadTask.on('state_changed',
            (snapshot) => {
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setVideoDownloadURL(downloadURL);
                });
            }
        );
    }

    const postReview = async () => {
        const res = await addDoc(collection(db, "reviews"), {
            productName: { productName },
            description: { description },
            rating: { rating },
        });

        postVideo(res.id);

        setReviewID(res.id);
        const docRef = doc(db, "reviews", reviewID);
        const data = {
            videoDownloadURL: { videoDownloadURL },
        }

        updateDoc(docRef, data);
        console.log("review posted with ID: " + res.id);
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