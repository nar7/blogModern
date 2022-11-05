// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB0jcyRVVZHCLwZgRvcBti_Zasq-vKzWM0",
  authDomain: "blogmodern-d5b7f.firebaseapp.com",
  projectId: "blogmodern-d5b7f",
  storageBucket: "blogmodern-d5b7f.appspot.com",
  messagingSenderId: "227003468764",
  appId: "1:227003468764:web:cd9df5495d1d91b7e31d19",
  measurementId: "G-W534YTYWNK",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
