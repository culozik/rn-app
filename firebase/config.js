import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBEYV4bAEjLSGpSnlsqIgOmJBpXgAjpwps",
  authDomain: "beg-rn-social.firebaseapp.com",
  projectId: "beg-rn-social",
  storageBucket: "beg-rn-social.appspot.com",
  messagingSenderId: "360020325037",
  appId: "1:360020325037:web:d8c62097f94e7971398c24",
  measurementId: "G-7CJYKFD2JH",
};

const db = initializeApp(firebaseConfig);
export default db;
