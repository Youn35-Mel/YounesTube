// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_BUCKET,
//   appId: process.env.REACT_APP_FIREBASE_API_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAbOpJvEbt6LBL2JI-SzbVwkUNi_NYSOZ8",
  authDomain: "video-blogtest.firebaseapp.com",
  databaseURL:
    "https://video-blogtest-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "video-blogtest",
  storageBucket: "video-blogtest.appspot.com",
  messagingSenderId: "977302895457",
  appId: "1:977302895457:web:c260e5dcb6c3f1fd9d6320",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
