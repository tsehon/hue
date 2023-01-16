import db from "../config/firebase";
import { collection, query, where, getDoc, getDocs, doc } from "firebase/firestore";

export async function getDisplayName(uid) {
    const user = await getDoc(doc(db, 'users', uid));
    return user.data().displayName;
}