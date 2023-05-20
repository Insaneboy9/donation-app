const {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");
const { db } = require("../firebaseConfig.js");

// Create a new document in a collection
const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Get all documents in a collection
const readDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

// Get a single document by ID
const readDocumentById = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    console.log("Document data:", docSnapshot.data());
  } else {
    console.log("No such document!");
  }
};

// Update a document by ID
const updateDocumentById = async (collectionName, documentId, data) => {
  const docRef = doc(db, collectionName, documentId);
  try {
    await updateDoc(docRef, data);
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete a document by ID
const deleteDocumentById = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  try {
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

module.exports = {
  createDocument,
  readDocuments,
  readDocumentById,
  updateDocumentById,
  deleteDocumentById,
};
