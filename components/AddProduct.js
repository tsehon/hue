import React, { useEffect, useState } from 'react'

import { Keyboard, StyleSheet } from "react-native";
import { ScrollView, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Feather, MaterialIcons } from '@expo/vector-icons'

import db from '../config/firebase';
import { storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, collection, addDoc, setDoc, updateDoc } from "firebase/firestore";
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'

export default function AddProduct({navigation, route}) {
    const [productName, setProductName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [link, setLink] = useState('');

    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
    const [galleryItems, setGalleryItems] = useState([]);
    const [images, setImages] = useState([]);

    const [requestRunning, setRequestRunning] = useState(false);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')

            if (galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: 'photo' })
                setGalleryItems(userGalleryMedia.assets)
            }
        })()
    }, [])

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
        }
    }

    const post = async () => {
        setRequestRunning(true);

        const docRef = await addDoc(collection(db, "products"), {
            name: productName,
            brand: brand,
            category: category,
            link: link,
            price: price,
            avgRating: Math.round((Math.random()*1.5 + 3.5) * 10)/10,
            numRatings: 0,
        });

        for (let i = 0; i<images.length; i++) {
            await postMedia((String)(docRef.id), images[i], i)
        }

        console.log('product upload complete')
        setRequestRunning(false);
        if (!route.params.fromUpload) navigation.goBack();
        else {
            navigation.navigate('Upload', {
                id: (String)(docRef.id),
                productName: productName,
                productBrand: brand,
                productCategory: category,
            })
        }
    }

    const postMedia = async (docID, media, i) => {
        const uploadRef = ref(storage, docID + (i+1).toString() + ".jpg");

        const promise = new Promise(function(resolve, reject) {
            fetch(media)
            .then(response => response.blob())
            .then(blob => {
                const uploadTask = uploadBytesResumable(uploadRef, blob)
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
                        blob.close();
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            setDoc(doc(db, "products", docID, 'images', (i+1).toString()), { url: downloadURL })
                            resolve();
                        });
                        
                    }
                )
            })
        });

        return await promise;
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
                <Header navigation={navigation} title='Add a product' style={{marginBottom: 8}}/>
                <View style={[styles.formContainer, {borderTopColor: 'lightgrey', borderTopWidth: 1,}]}>
                    <TextInput
                        style={[styles.inputText, styles.text]}
                        maxLength={70}
                        onChangeText={(text) => setProductName(text.trim())}
                        placeholder="Product Name"
                        returnKeyType='done'
                    />
                </View>
                <View style={[styles.formContainer, {alignItems: 'flex-start'}]}>
                    <TextInput
                        style={[styles.inputText, styles.text]}
                        maxLength={30}
                        onChangeText={(text) => setBrand(text.trim())}
                        placeholder="Brand"
                        returnKeyType='done'
                    />
                </View>
                <View style={[styles.formContainer, {alignItems: 'flex-start'}]}>
                    <TextInput
                        style={[styles.inputText, styles.text]}
                        maxLength={30}
                        onChangeText={(text) => setCategory(text.trim())}
                        placeholder="Category"
                        returnKeyType='done'
                    />
                </View>
                <View style={[styles.formContainer, {alignItems: 'flex-start'}]}>
                    <TextInput
                        style={[styles.inputText, styles.text]}
                        maxLength={8}
                        onChangeText={(text) => {
                            const trimmed = text.trim()
                            const numericRegex = /^([0-9]{1,100})+([.]{0,1})([0-9]{1,2})$/
                            if(numericRegex.test(trimmed)) setPrice(trimmed*1);
                        }}
                        placeholder="Price"
                        keyboardType = 'numeric'
                        returnKeyType='done'
                    />
                </View>
                <View style={[styles.formContainer, {alignItems: 'flex-start'}]}>
                    <TextInput
                        style={[styles.inputText, styles.text]}
                        maxLength={200}
                        onChangeText={(text) => setLink(text.trim())}
                        placeholder="Link to purchase"
                        returnKeyType='done'
                    />
                </View>
                <TouchableOpacity style={styles.bottomFormContainer} onPress={() => {
                    Keyboard.dismiss()
                    pickFromGallery()
                }}>
                    <Text style={styles.text}> Images </Text>
                    <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.spacer}
                    onClick={() => null}
                >
                    <ScrollView horizontal style={{padding: 10, flex: 1}}>
                        {images.map((element, index) => (
                            <View key={index} style={{width: 150, height: 150, marginRight: 10}}>
                                <Image key={index} source={{ uri: element }} style={{flex: 1}} />
                                <TouchableOpacity
                                    style={{position: 'absolute', width: 30, height: 30, right: 0, top: 0, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}
                                    onPress={() => setImages(images.filter((e, imgIndex) => imgIndex != index))}
                                >
                                    <MaterialIcons name="delete-outline" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => post()}
                        style={styles.postButton}>
                        <Feather name="corner-left-up" size={24} color="black" />
                        <Text style={styles.postButtonText}>Add product</Text>
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
        width: 90
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
        backgroundColor: '#B3B3B3',
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