import React, { useEffect, useState, useRef } from 'react'

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
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const videosRef = ref(storage, 'videos');

export default function UploadReviewPage({ navigation, route }) {
    const [productID, setProductID] = useState('');
    const [productName, setProductName] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0.0);

    const [source, setSource] = useState('');
    const [sourceThumb, setSourceThumb] = useState('');

    const [requestRunning, setRequestRunning] = useState(false);

    const searchRef = useRef(null);

    useEffect(() => {
        if (route.params.source) setSource(route.params.source);
        if (route.params.sourceThumb) setSourceThumb(route.params.sourceThumb);
    }, [])

    useEffect(() => {
        if (route.params.id) setProductID(route.params.id);
        if (route.params.productName) setProductName(route.params.productName);
        if (route.params.productBrand) setProductBrand(route.params.productBrand);
        if (route.params.productCategory) setProductCategory(route.params.productCategory);
    }, [route])

    const handlePost = () => {
        console.log("handling post");

        if (source == null) {
            navigation.goBack();
            return;
        }

        postReview();
    }

    const postMedia = async (storageURI, media, docRef, typeURI) => {
        const uploadRef = ref(storage, storageURI);

        const promise = new Promise(function(resolve, reject) {
            fetch(media)
            .then(response => response.blob())
            .then(videoblob => {
                const uploadTask = uploadBytesResumable(uploadRef, videoblob)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        console.log(snapshot.bytesTransferred + ' / ' + snapshot.totalBytes);
                    },
                    (error) => {
                        console.log('postMedia error: ' + error);
                        reject(error);
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL and add to document
                        videoblob.close();
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            updateDoc(docRef, {[typeURI]: downloadURL});
                            resolve();
                        });
                        
                    }
                )
            })
        });

        return await promise;
    }

    const postReview = async () => {
        setRequestRunning(true);
        const reviewRef = await addDoc(collection(db, "reviews"), {
            productName: productName,
            productID: productID,
            categoryName: productCategory,
            brand: productBrand,
            description: description,
            rating: rating,
            upvotes: 0,
            downvotes: 0,
            upvotesMinusDownvotes: 0,
        });

        const videoURI = (String)(reviewRef.id) + ".mp4";
        console.log(videoURI)
        console.log(source)
        await postMedia(videoURI, source, reviewRef, 'videoDownloadURL');

        if (sourceThumb) {
            const thumbnailURI = (String)(reviewRef.id) + ".jpg";
            await postMedia(thumbnailURI, sourceThumb, reviewRef, 'thumbnailDownloadURL');
        }

        console.log("review posted with ID: " + reviewRef.id);
        setRequestRunning(false);

        navigation.goBack();
    }

    if (requestRunning) {
        return (
            <View style={styles.uploadingContainer}>
                <FocusAwareStatusBar barStyle='dark-content'/>
                <ActivityIndicator color='red' size='large' />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <View style={styles.container}>
                <Header navigation={navigation} title='Post a review' style={{marginBottom: 8}}/>
                <View style={[styles.formContainer, {borderTopColor: 'lightgrey', borderTopWidth: 1,}]}>
                    <TextInput
                        ref={searchRef}
                        style={[styles.inputText, styles.text]}
                        maxLength={30}
                        onFocus={() => {
                            navigation.navigate('UploadSearch')
                            searchRef.current.blur()
                        }}
                        placeholder="Product Name"
                        value={productName}
                        returnKeyType='done'
                    />
                </View>
                <View style={[styles.formContainer, {alignItems: 'flex-start'}]}>
                    <TextInput
                        style={[styles.inputText, styles.text]}
                        maxLength={180}
                        onChangeText={(text) => setDescription(text.trim())}
                        placeholder="Write your review"
                        returnKeyType='done'
                    />
                    <TouchableOpacity>
                        <Image
                            style={styles.mediaPreview}
                            source={ sourceThumb ? { uri: sourceThumb } : {}}
                        />
                        <Text style={styles.mediaPreviewOverlay}>Set Cover</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomFormContainer}>
                    <Text style={styles.text}> Rating </Text>
                    <Stars
                        rating={rating}
                        starSize={32}
                        color='#FFB800'
                        emptyColor='#FFB800'
                        disabled={false}
                        onChange={setRating}
                    />
                </View>
                <TouchableOpacity style={styles.bottomFormContainer}>
                    <Text style={styles.text}> Tags </Text>
                    <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.bottomFormContainer}>
                    <Text style={styles.text}> Brand: </Text>
                    <Text style={styles.text}> {productBrand} </Text>
                </View>
                <View style={styles.bottomFormContainer}>
                    <Text style={styles.text}> Category: </Text>
                    <Text style={styles.text}> {productCategory} </Text>
                </View>
                <View style={styles.spacer}
                    onClick={() => null}
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Draft</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handlePost()}
                        style={styles.postButton}>
                        <Feather name="corner-left-up" size={24} color="black" />
                        <Text style={styles.postButtonText}>Post review</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 14,
        fontFamily: 'Plus-Jakarta-Sans',
    },
    container: {
        flex: 1,
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
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    bottomFormContainer: {
        padding: 20,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        width: 90,
        borderRadius: 10,
    },
    mediaPreviewOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 7,
        textAlign: 'center',
        backgroundColor: '#7D7D7D',
        fontSize: 12,
        fontFamily: 'Plus-Jakarta-Sans',
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
        flexGrow: 1,
        backgroundColor: '#EDEDED',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 5,
    },
    postButton: {
        alignItems: 'center',
        flexGrow: 2,
        backgroundColor: '#ff6868',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 5,
    },
    tagText: {
        marginLeft: 5,
        color: 'white',
        fontSize: 16
    },
    cancelButtonText: {
        marginLeft: 5,
        fontFamily: 'Plus-Jakarta-Sans',
        fontSize: 16
    },
    postButtonText: {
        marginLeft: 5,
        fontFamily: 'PlusJakartaSans-SemiBold',
        fontSize: 16
    }
});