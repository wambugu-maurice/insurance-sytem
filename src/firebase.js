import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5ODPcd0rYK4AB3kQ9Sygmlt9oSNkqKlY",
  authDomain: "insurancesytem.firebaseapp.com",
  projectId: "insurancesytem",
  storageBucket: "insurancesytem.firebasestorage.app",
  messagingSenderId: "773873772025",
  appId: "1:773873772025:web:a2ac1c60be0b36941e4928",
  measurementId: "G-8X3T1BHZRQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
