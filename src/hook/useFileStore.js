import React, {useEffect, useState} from 'react';
import {db} from "../firebase/config";

function UseFileStore(collection, condition) {
    let [docs, setDocs] = useState(null);
    useEffect(() => {
        let collectionRef = db().collection(`${collection}`)
            .orderBy("createdAt", "asc");
        if (collectionRef && condition && condition.fieldName && condition.operator && condition.compareValue) {
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
        }
        let unSub = null;
        unSub = () => {
            collectionRef.onSnapshot((snapShot) => {
                let data = snapShot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setDocs(data);
            })
        };
        unSub();
        return unSub;
    }, [collection, condition]);

    return docs;
}

export default UseFileStore;
