import firebase, {db} from "./config";

export const addDocument = (collection, data) => {
    db().collection(collection).add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}
