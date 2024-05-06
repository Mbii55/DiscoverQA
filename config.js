// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBwAqX5JzqnCiFBNtMUD_rJ_z2T3wdsu_s",
//   authDomain: "test-84d07.firebaseapp.com",
//   projectId: "test-84d07",
//   storageBucket: "test-84d07.appspot.com",
//   messagingSenderId: "488478310685",
//   appId: "1:488478310685:web:ef32a93d6132d05657e1f4",
//   measurementId: "G-QECESV9QT9"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBblRpYXW3BBmUPrgoeFFNRYMYv9DojA4Y",
  authDomain: "infs4104-2c2a4.firebaseapp.com",
  projectId: "infs4104-2c2a4",
  storageBucket: "infs4104-2c2a4.appspot.com",
  messagingSenderId: "202693687288",
  appId: "1:202693687288:web:5e4ebf3c66693dc260080d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app);