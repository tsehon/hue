import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { useRef, useEffect, useState } from 'react';
import { clearModal } from '../redux/actions/commentModal';

import { commentListener, addComment, clearCommentListener } from '../services/comments';

const CommentItem = ({ item }) => {
    const userTag = "@" + item.creator;
    return (
        <View style={styles.itemcontainer}>
            <View style={styles.containerText}>
                <Text style={styles.displayName}> {userTag} </Text>
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
        if (comment.length == 0) {
            return;
        }
        setComment('')
        addComment(post.id, 'username', comment)
        commentListener(post.id, setCommentList);
    }

    const renderItem = ({ item }) => {
        return <CommentItem item={item} />
    }

    return (
        <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.container}
        >
            <FlatList
                data={commentList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.containerInput}>
                <TextInput
                    value={comment}
                    onChangeText={setComment}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => handleCommentSend()}>
                    <Ionicons name="arrow-up-circle" size={34} color={'grey'} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
};

export default function CommentModal({ navigation, route }) {
    const modalState = useSelector(state => state.modal);
    const bottomSheetRef = useRef(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalState.open && bottomSheetRef.current) {
            bottomSheetRef.current.expand()
        }
    }, [modalState])

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
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={["50%"]}
            index={-1}
            onClose={onClose}
            handleHeight={40}
            enablePanDownToClose>
            {renderContent()}
        </BottomSheet>
    );
}


const styles = StyleSheet.create({
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