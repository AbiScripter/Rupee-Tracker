// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE91gK_YFj-peDZ3OES9hDBw0VXVHzGqA",
  authDomain: "finance-tracker-28d4a.firebaseapp.com",
  projectId: "finance-tracker-28d4a",
  storageBucket: "finance-tracker-28d4a.appspot.com",
  messagingSenderId: "825986664965",
  appId: "1:825986664965:web:2128d015ae49ef2f8c6a6c",
  measurementId: "G-2LBQM2SM65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
