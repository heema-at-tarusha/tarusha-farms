// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANYxvLZdaQ_ksnxSde5uUm63ZbBSakwuk",
  authDomain: "tarushafarms.firebaseapp.com",
  projectId: "tarushafarms",
  storageBucket: "tarushafarms.firebasestorage.app",
  messagingSenderId: "189631971665",
  appId: "1:189631971665:web:e48a69af6a80a85e681370",
  measurementId: "G-EESNQM5EVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut };
