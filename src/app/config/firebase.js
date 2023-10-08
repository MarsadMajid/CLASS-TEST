// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "class-test-bbf1e.firebaseapp.com",
  projectId: "class-test-bbf1e",
  storageBucket: "class-test-bbf1e.appspot.com",
  messagingSenderId: "54516083475",
  appId: "1:54516083475:web:82a1c93ff11b96af6f08e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);