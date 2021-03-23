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
  apiKey: 'AIzaSyCK4Eb4z6nLA_wv92mpf8CjbCb84Z2V2-Q',
  authDomain: 'descartespi4.firebaseapp.com',
  databaseURL: 'https://descartespi4-default-rtdb.firebaseio.com/',
  projectId: 'descartespi4',
  storageBucket: 'descartespi4.appspot.com',
  messagingSenderId: '1046834077879',
  appId: '1:1046834077879:web:6666cb44d02f05012ced32',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, firestore, auth, storage };
