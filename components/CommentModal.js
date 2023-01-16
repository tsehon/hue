import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, Text, Image, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { useRef, useEffect, useState } from 'react';
import { clearModal } from '../redux/actions/commentModal';
import Modal from "react-native-modal";

import { commentListener, addComment, clearCommentListener } from '../services/comments';
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';

const auth = getAuth();

const CommentItem = ({ item }) => {
    const userTag = "@" + item.displayName;
    return (
        <View style={localStyles.itemcontainer}>
            <View style={localStyles.containerText}>
                <Text style={localStyles.displayName}> {userTag} </Text>
                <Text>{item.comment}</Text>
            </View>
        </View>
    )
};

const CommentSubModal = ({ post }) => {
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        console.log("id is " + post.id);
        commentListener(post.id, setCommentList);
        return () => clearCommentListener();
    }, [])

    const handleCommentSend = () => {
        if (!auth.currentUser) {
            Alert.alert('You must be logged in to comment')
            return;
        }
        if (comment.length == 0) {
            return;
        }
        setComment('')
        addComment(post.id, auth.currentUser.uid, comment)
        commentListener(post.id, setCommentList);
    }

    const renderItem = ({ item }) => {
        return <CommentItem item={item} />
    }

    return (
        <View
            style={localStyles.container}
        >
            <FlatList
                data={commentList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={localStyles.containerInput}>
                    <TextInput
                        value={comment}
                        onChangeText={setComment}
                        style={localStyles.input}
                    />
                <TouchableOpacity onPress={() => handleCommentSend()}>
                    <Ionicons name="arrow-up-circle" size={34} color={'grey'} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default function CommentModal({ navigation, route }) {
    const modalState = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const renderContent = () => {
        console.log(modalState.data);
        switch (modalState.modalType) {
            case 0:
                return (<CommentSubModal post={modalState.data} />)
            default:
                return (<></>)
        }
    }
    const onClose = () => {
        dispatch(clearModal())
    }

    return (
        <Modal
            isVisible={modalState.open}
            style={{margin: 0}}
        >
            <Pressable
                onPress={() => onClose()}
                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            />
            <KeyboardAvoidingView
                behavior='position'
                style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%'}}
                contentContainerStyle={{height: '100%', backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10}}
            >
                {renderContent()}
            </KeyboardAvoidingView>
        </Modal>
    );
}


const localStyles = StyleSheet.create({
    itemcontainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        flex: 1,
    },
    containerText: {
        marginHorizontal: 14
    },
    displayName: {
        color: 'gray',
        fontSize: 13,
        marginLeft: -5,
        marginBottom: 2,
    },
    container: {
        justifyContent: 'flex-end',
        flex: 1
    },
    containerInput: {
        padding: 10,
        flexDirection: 'row',
        marginBottom: 30,
    },
    input: {
        backgroundColor: 'lightgrey',
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10
    },
})