// Auth-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZ4UTZMBQKWXEUyBwdX0FY8XGMWwm2EhE",
  authDomain: "shk-app-42c28.firebaseapp.com",
  projectId: "shk-app-42c28",
  storageBucket: "shk-app-42c28.firebasestorage.app",
  messagingSenderId: "715933965442",
  appId: "1:715933965442:web:997d6a21cad323f0ece89b",
  measurementId: "G-F1B6BNXC8Y"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 
