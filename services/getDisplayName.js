import db from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";

export default async function getDisplayName(uid) {
    const user = await getDoc(doc(db, 'users', uid));
    return user.data().displayName;
}