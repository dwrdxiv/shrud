import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "shoecrud.firebaseapp.com",
    projectId: "shoecrud",
    storageBucket: "shoecrud.firebasestorage.app",
    messagingSenderId: "183946496152",
    appId: "1:183946496152:web:31b2f13b38ccab45e3a8ed"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);   // Base de datos
export const auth = getAuth(app);     // Autenticación