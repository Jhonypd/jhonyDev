// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_NQjpBKhfTJBNoXNRuSVDe3Z91y2iDhI",
  authDomain: "jhonydev-8689f.firebaseapp.com",
  projectId: "jhonydev-8689f",
  storageBucket: "jhonydev-8689f.appspot.com",
  messagingSenderId: "357406013196",
  appId: "1:357406013196:web:84fd41b9e7d902b6b03b29",
  measurementId: "G-DC6R2LSLEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const analytics = getAnalytics(app);

const storage = getStorage (app);

export { db, analytics, storage }