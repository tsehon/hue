import React, { useEffect, useState, useRef } from 'react'

import { StyleSheet } from "react-native";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Stars from '../components/Stars';
import { Feather } from '@expo/vector-icons'

import db from '../config/firebase';
import { collection, addDoc, updateDoc } from "firebase/firestore";

import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';
import uploadMedia from '../services/uploadMedia';
import styles from '../styles/styles';

const auth = getAuth();

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
        if (!auth.currentUser) {
            Alert.alert('You must be logged in to post')
            return;
        }

        if (source == null) {
            navigation.goBack();
            return;
        }

        postReview();
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
            uid: auth.currentUser.uid,
        });

        const videoName = (String)(reviewRef.id) + ".mp4";
        const videoDownload = await uploadMedia(videoName, source);
        await updateDoc(reviewRef, {videoDownloadURL: videoDownload});

        if (sourceThumb) {
            const thumbnailName = (String)(reviewRef.id) + ".jpg";
            const thumbDownload = await uploadMedia(thumbnailName, sourceThumb);
            await updateDoc(reviewRef, {thumbnailDownloadURL: thumbDownload});
        }

        console.log("review posted with ID: " + reviewRef.id);
        setRequestRunning(false);

        navigation.goBack();
    }

    if (requestRunning) {
        return (
            <View style={localStyles.uploadingContainer}>
                <FocusAwareStatusBar barStyle='dark-content'/>
                <ActivityIndicator color='red' size='large' />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
            <FocusAwareStatusBar barStyle='dark-content'/>
            <View style={localStyles.container}>
                <Header navigation={navigation} title='Post a review' style={{marginBottom: 8}}/>
                <View style={[localStyles.formContainer, {borderTopColor: 'lightgrey', borderTopWidth: 1,}]}>
                    <TextInput
                        ref={searchRef}
                        style={[localStyles.inputText, localStyles.text]}
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
                <View style={[localStyles.formContainer, {alignItems: 'flex-start'}]}>
                    <TextInput
                        style={[localStyles.inputText, localStyles.text]}
                        maxLength={180}
                        onChangeText={(text) => setDescription(text.trim())}
                        placeholder="Write your review"
                        returnKeyType='done'
                    />
                    <TouchableOpacity>
                        <Image
                            style={localStyles.mediaPreview}
                            source={ sourceThumb ? { uri: sourceThumb } : {}}
                        />
                        <Text style={localStyles.mediaPreviewOverlay}>Set Cover</Text>
                    </TouchableOpacity>
                </View>
                <View style={localStyles.bottomFormContainer}>
                    <Text style={localStyles.text}> Rating </Text>
                    <Stars
                        rating={rating}
                        starSize={32}
                        color='#FFB800'
                        emptyColor='#FFB800'
                        disabled={false}
                        onChange={setRating}
                    />
                </View>
                <TouchableOpacity style={localStyles.bottomFormContainer}>
                    <Text style={localStyles.text}> Tags </Text>
                    <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
                <View style={localStyles.bottomFormContainer}>
                    <Text style={localStyles.text}> Brand: </Text>
                    <Text style={localStyles.text}> {productBrand} </Text>
                </View>
                <View style={localStyles.bottomFormContainer}>
                    <Text style={localStyles.text}> Category: </Text>
                    <Text style={localStyles.text}> {productCategory} </Text>
                </View>
                <View style={localStyles.spacer}
                    onClick={() => null}
                />
                <View style={localStyles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={localStyles.cancelButton}>
                        <Text style={localStyles.cancelButtonText}>Draft</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handlePost()}
                        style={localStyles.postButton}>
                        <Feather name="corner-left-up" size={24} color="black" />
                        <Text style={localStyles.postButtonText}>Post review</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const localStyles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontFamily: 'PlusJakartaSans-Regular',
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
        fontFamily: 'PlusJakartaSans-Regular',
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
    cancelButtonText: {
        marginLeft: 5,
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: 16
    },
    postButtonText: {
        marginLeft: 5,
        fontFamily: 'PlusJakartaSans-SemiBold',
        fontSize: 16
    }
});