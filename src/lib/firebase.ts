import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDc0dTq5Qj9Tpni9IxjFtXS_0HhQMuu4Vw",
  authDomain: "cozy-flatemate.firebaseapp.com",
  projectId: "cozy-flatemate",
  storageBucket: "cozy-flatemate.firebasestorage.app",
  messagingSenderId: "557817627316",
  appId: "1:557817627316:web:e1a92687b1a735e32b8de1",
  measurementId: "G-YH9GC283HM"
};

// Initialize Firebase (singleton pattern for Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, firebaseConfig };
