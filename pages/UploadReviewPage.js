import React, { useState } from 'react'

import { StyleSheet } from "react-native";
import { Keyboard } from 'react-native';
import { ScrollView, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/native';

export default function UploadReviewPage({ navigation, route }) {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0.0);

    const [requestRunning, setRequestRunning] = useState(false);

    const handlePost = () => {
        setRequestRunning(true);
        // createPost(description, route.params.source, route.params.sourceThumb);
        // StackActions.popToTop();
        setRequestRunning(false);
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
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.inputText}
                    maxLength={30}
                    onChangeText={(text) => setProductName(text.trim())}
                    placeholder="Rating"
                />
            </View>
            <View style={styles.formContainer}>
                <Text> Tags </Text>
                <View style={styles.tagsContainer}>
                    <TouchableOpacity
                        style={styles.tag}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tag}>
                        <Text style={styles.postButtonText}>Post</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'grey',
    },
    topSpacer: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
    },
    formContainer: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        borderBottomWidth: 2,
    },
    tagsContainer: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10,
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
        padding: 5,
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