import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDO75_JLsPIhabnS8XrLgOGFwsjE3q8D24",
    authDomain: "foodgram-15.firebaseapp.com",
    databaseURL: "https://foodgram-15.firebaseio.com",
    projectId: "foodgram-15",
    storageBucket: "foodgram-15.appspot.com",
    messagingSenderId: "824353045474",
    appId: "1:824353045474:web:4c4a991160fe64653917bb",
    measurementId: "G-9P8VY5HHJF"
};

// Initialize Firebase
Firebase.initializeApp(firebaseConfig);
export default Firebase;
