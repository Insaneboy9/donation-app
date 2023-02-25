// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3dVJp8utspEyxTL9yh8SqiP7x4ijFwnk",
  authDomain: "donation-app-8de49.firebaseapp.com",
  projectId: "donation-app-8de49",
  storageBucket: "donation-app-8de49.appspot.com",
  messagingSenderId: "160131275402",
  appId: "1:160131275402:web:a229e0612168fc701feb73",
  measurementId: "G-BZSV92Z7QW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db};
