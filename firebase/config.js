import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEYV4bAEjLSGpSnlsqIgOmJBpXgAjpwps",
  authDomain: "beg-rn-social.firebaseapp.com",
  projectId: "beg-rn-social",
  storageBucket: "beg-rn-social.appspot.com",
  messagingSenderId: "360020325037",
  appId: "1:360020325037:web:d8c62097f94e7971398c24",
  measurementId: "G-7CJYKFD2JH",
};

const db = firebase.initializeApp(firebaseConfig);
export default db;
