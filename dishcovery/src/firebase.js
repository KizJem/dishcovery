// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjodj_crU80p1iAEvcfrAAZm3N9AspnV0",
  authDomain: "dishcovery-d12f5.firebaseapp.com",
  projectId: "dishcovery-d12f5",
  storageBucket: "dishcovery-d12f5.firebasestorage.app",
  messagingSenderId: "602254462291",
  appId: "1:602254462291:web:b54aef45f6b0b98fd125a6",
  measurementId: "G-H2R5LCDEGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Get user info
    const user = result.user;
    console.log("✅ Google Sign-In Success:", user);
    alert(`Welcome, ${user.displayName}!`);
    return user;
  } catch (error) {
    console.error("❌ Google Sign-In Error:", error);
    alert("Google sign-in failed. Try again.");
  }
};
