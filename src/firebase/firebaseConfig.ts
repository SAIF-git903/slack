// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX9G04r8wkD8Z4xVZeR3dKERblMLUoc8I",
  authDomain: "slack-e4d40.firebaseapp.com",
  projectId: "slack-e4d40",
  storageBucket: "slack-e4d40.appspot.com",
  messagingSenderId: "1077238128187",
  appId: "1:1077238128187:web:43cef14bc35fcd1100c61e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { db, auth, storage };
