import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuxrajM176omsOeN279xDaHjy0xuqgegw",
  authDomain: "login-authentication-c5cdf.firebaseapp.com",
  projectId: "login-authentication-c5cdf",
  storageBucket: "login-authentication-c5cdf.firebasestorage.app",
  messagingSenderId: "883457726323",
  appId: "1:883457726323:web:cfd9611efdef6dde3ad706",
  measurementId: "G-23LQNHXPKM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);