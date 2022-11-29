import db from '../config/firebase'

let commentListenerInstance = null

export const addComment = (postId, creator, comment) => {
    firebase.firestore()
        .collection('post')
        .doc(postId)
        .collection('comments')
        .add({
            creator,
            comment,
            creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
}

export const commentListener = (postId, setCommentList) => {
    commentListenerInstance = get 
        .collection('post')
        .doc(postId)
        .collection('comments')
        .orderBy('creation', 'desc')
        .onSnapshot((snapshot) => {
            if (snapshot.docChanges().length == 0) {
                return;
            }
            let comments = snapshot.docs.map((value) => {
                const id = value.id;
                const data = value.data();
                return { id, ...data }
            })
            setCommentList(comments)
        })
}

export const clearCommentListener = () => {
    if (commentListenerInstance != null) {
        commentListenerInstance();
        commentListenerInstance = null
    }
}