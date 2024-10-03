import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH2aEBM7vQ9UizJS1aFsiRLP4Qu6V7vrI",
  authDomain: "estadisticas-c64d2.firebaseapp.com",
  projectId: "estadisticas-c64d2",
  storageBucket: "estadisticas-c64d2.appspot.com",
  messagingSenderId: "309018705623",
  appId: "1:309018705623:web:96f57880ac88077c0d3a92"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;