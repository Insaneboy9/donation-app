import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebaseConfig.js";

// Create a new document in a collection
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all documents in a collection
export const readDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

// Get a single document by ID
export const readDocumentById = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    console.log("Document data:", docSnapshot.data());
  } else {
    console.log("No such document!");
  }
};

// Update a document by ID
export const updateDocumentById = async (collectionName, documentId, data) => {
  const docRef = doc(db, collectionName, documentId);
  try {
    await updateDoc(docRef, data);
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};


// Delete a document by ID
export const deleteDocumentById = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  try {
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

