import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_6YmKqtNnGXjWwyj3rr6rgBkrEIZvs5Y",
  authDomain: "deebeex-97c12.firebaseapp.com",
  projectId: "deebeex-97c12",
  storageBucket: "deebeex-97c12.firebasestorage.app",
  messagingSenderId: "83237853480",
  appId: "1:83237853480:web:5ca4f54d5201357177581d",
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
