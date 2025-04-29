// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1w4hANvwSdvMIS73FDX6oCRGZ_8ReZkM",
  authDomain: "electropanel-d814d.firebaseapp.com",
  projectId: "electropanel-d814d",
  storageBucket: "electropanel-d814d.firebasestorage.app",
  messagingSenderId: "96642498725",
  appId: "1:96642498725:web:7502e5ef3f35581a158d4c",
  measurementId: "G-6S4MKZWF2C",
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase Config:", firebaseConfig);
const googleProvider = new GoogleAuthProvider(); // 🔹 NEW


// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
// Inspect the ID token only if the user is authenticated

// Initialize Firestore
const db = getFirestore(app);

export { db};
