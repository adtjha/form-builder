// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBT0HT1ydqSWJ_2XuZvFwP3krNCi_RPqBo",
    authDomain: "quest-adtjha.firebaseapp.com",
    projectId: "quest-adtjha",
    storageBucket: "quest-adtjha.appspot.com",
    messagingSenderId: "7245264057",
    appId: "1:7245264057:web:6f0ce8568c59634b40d768",
    measurementId: "G-TYBWWMHYXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
