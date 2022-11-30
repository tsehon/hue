import db from '../config/firebase'
import { setDoc, Timestamp, getDocs, collection, where, query, doc, updateDoc, getDoc, orderBy, addDoc } from "firebase/firestore";

let commentListenerInstance = null

export const addComment = async (id, creator, comment) => {
    let time = Timestamp.now();
    console.log("time" + time);

    const commentsRef = collection(db, 'reviews', id, 'comments');

    const docRef = await addDoc(commentsRef, {
        creator: creator,
        comment: comment,
        creation: time,
    });

    console.log("Document written with ID: ", docRef.id);
}

export const commentListener = async (id, setCommentList) => {
    const colRef = collection(db, 'reviews', id, 'comments');
    const q = query(colRef, orderBy('creation'));

    const snapshot = await getDocs(q);

    if (!snapshot.docChanges().length) {
        console.log("empty comment section");
        return;
    }

    let comments = snapshot.docs.map((value) => {
        console.log("comment: " + value.data());
        const id = value.id;
        const data = value.data();
        return { id, ...data }
    });

    setCommentList(comments);
}

export const clearCommentListener = async () => {
    if (commentListenerInstance != null) {
        commentListenerInstance();
        commentListenerInstance = null
    }
}