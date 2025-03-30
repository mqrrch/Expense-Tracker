// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7e4rroIndXHihNpni083n-4Ktx8VoRnQ",
  authDomain: "expense-tracker-3c43c.firebaseapp.com",
  projectId: "expense-tracker-3c43c",
  storageBucket: "expense-tracker-3c43c.firebasestorage.app",
  messagingSenderId: "745670699274",
  appId: "1:745670699274:web:f9e218fb818d8d7d0e72f3",
  measurementId: "G-0447RQR190"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);