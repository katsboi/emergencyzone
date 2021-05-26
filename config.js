import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBLEFOkOEUpaPMoDx8X_74EwZvFgwfeK8c",
  authDomain: "emergencyzone-6bf0d.firebaseapp.com",
  projectId: "emergencyzone-6bf0d",
  storageBucket: "emergencyzone-6bf0d.appspot.com",
  messagingSenderId: "407401686810",
  appId: "1:407401686810:web:751e6aebba28ec27202ea3",
  measurementId: "G-EN69HW3HYE"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();