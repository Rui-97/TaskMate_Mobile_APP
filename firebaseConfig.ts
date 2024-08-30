import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1e8LO7bxVTXl5k5SF6gFzxDFP3uNLD1w",
  authDomain: "taskmate-5aa8a.firebaseapp.com",
  projectId: "taskmate-5aa8a",
  storageBucket: "taskmate-5aa8a.appspot.com",
  messagingSenderId: "133949715466",
  appId: "1:133949715466:web:55888db84d97fb979c1bf3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
