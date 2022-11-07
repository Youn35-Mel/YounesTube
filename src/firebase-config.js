// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_BUCKET,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
};

// capstone Oauth firebase-config
// const firebaseConfig = {
//   apiKey: "AIzaSyAEj6KNGCfwEMFJXz_euutAxJv9CVjXt8I",
//   authDomain: "capstone-oauth-1d504.firebaseapp.com",
//   databaseURL:
//     "https://capstone-oauth-1d504-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "capstone-oauth-1d504",
//   storageBucket: "capstone-oauth-1d504.appspot.com",
//   messagingSenderId: "28619707886",
//   appId: "1:28619707886:web:737ef0984c0baf9265eaff",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
