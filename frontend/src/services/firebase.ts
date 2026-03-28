// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClOMH-PeK7y8w3NArL4uhHvp-lHn8mW3E",
  authDomain: "quiznest-625b5.firebaseapp.com",
  projectId: "quiznest-625b5",
  storageBucket: "quiznest-625b5.firebasestorage.app",
  messagingSenderId: "299480671856",
  appId: "1:299480671856:web:6569ee247555e4769136b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
