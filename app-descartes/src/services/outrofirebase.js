import firebase from 'firebase/app';
import 'firebase/firebase-database';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
import 'firebase/firebase-storage';

// Optionally import the services that you want to use
// import "firebase/auth";
// import "firebase/database";
// import "firebase/firestore";
// import "firebase/functions";
// import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxt1lRrf2aGf5Kwt0QnKe1_CP3OrqIwuQ",
  authDomain: "descartes-pi42.firebaseapp.com",
  databaseURL: 'https://descartes-pi42-default-rtdb.firebaseio.com/',
  projectId: "descartes-pi42",
  storageBucket: "descartes-pi42.appspot.com",
  messagingSenderId: "567989266356",
  appId: "1:567989266356:web:bbed20e536da219508b4e1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, firestore, auth, storage };

