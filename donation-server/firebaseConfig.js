// Import the functions you need from the SDKs you need
const firebase= require("firebase")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3dVJp8utspEyxTL9yh8SqiP7x4ijFwnk",
    authDomain: "donation-app-8de49.firebaseapp.com",
    projectId: "donation-app-8de49",
    storageBucket: "donation-app-8de49.appspot.com",
    messagingSenderId: "160131275402",
    appId: "1:160131275402:web:a229e0612168fc701feb73",
    measurementId: "G-BZSV92Z7QW"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
module.exports = db;
