import { collection, query, where, getDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

// Update documents based on a field value
export const subtractUserCash = async (collectionName, fieldName, fieldValue, subtractField, subtractValue) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(fieldName, "==", fieldValue));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const docRef = doc(db, collectionName, document.id);
      try {
        const doc = await getDoc(docRef);
        const currentFieldValue = doc.data()[subtractField];
        await updateDoc(docRef, {
          [subtractField]: currentFieldValue - subtractValue,
          // add other fields to update here
        });
        console.log(`Document with ${fieldName}=${fieldValue} successfully updated!`);
      } catch (e) {
        console.error(`Error updating document with ${fieldName}=${fieldValue}: `, e);
      }
    });
  };