
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAivp5gZXQpKnnOdEjANw6xSiGOvSpXMtg",
  authDomain: "business-dashboard-4a388.firebaseapp.com",
  projectId: "business-dashboard-4a388",
  storageBucket: "business-dashboard-4a388.firebasestorage.app",
  messagingSenderId: "868598333218",
  appId: "1:868598333218:web:0deeddfd5e29b706e8af7b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
