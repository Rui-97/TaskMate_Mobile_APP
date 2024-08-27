import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1e8LO7bxVTXl5k5SF6gFzxDFP3uNLD1w",
  authDomain: "taskmate-5aa8a.firebaseapp.com",
  projectId: "taskmate-5aa8a",
  storageBucket: "taskmate-5aa8a.appspot.com",
  messagingSenderId: "133949715466",
  appId: "1:133949715466:web:55888db84d97fb979c1bf3",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
