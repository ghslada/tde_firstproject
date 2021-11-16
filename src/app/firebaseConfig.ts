/* eslint-disable prefer-const */
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/quotes */
//FIRST YOU NEED TO INSTALL FIREBASE USING NPM
//npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { query, where, onSnapshot } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPwqRCuXy3afBRYkX9te34mL7ScrNgU74",
    authDomain: "ecommercecortinastde.firebaseapp.com",
    projectId: "ecommercecortinastde",
    storageBucket: "ecommercecortinastde.appspot.com",
    messagingSenderId: "634121702343",
    appId: "1:634121702343:web:581d796919c886854127e2",
    measurementId: "G-11G9TBR6L3"
  };

// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);
// console.log("Hello from app: " + JSON.stringify(fireApp));
export const db = getFirestore(fireApp);
export let auth = getAuth(fireApp);
console.log("Database: " + JSON.stringify(db));
