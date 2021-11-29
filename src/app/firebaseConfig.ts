/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/quotes */
//FIRST YOU NEED TO INSTALL FIREBASE USING NPM
//npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { query, where, onSnapshot } from "firebase/firestore";
import { Router } from '@angular/router';
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
export const auth = getAuth(fireApp);
export let produto: any = {'id': 1, 'url_img': '', 'valor_tecido': 0, 'tecido': '', 'sistema': '', 'medidas': {'altura': 0, 'largura': 0, 'proporcao': 3,'partes': 0, 'metros_lineares': 0}, 'acessorio': {"valor": '', 'descricao': ''}, 'valor': 0, 'qtd': 1};
export let carrinho: any = [];
console.log("Database: " + JSON.stringify(db));

export const verificaSeLogado = (router: Router) =>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = auth.currentUser.uid;
      if(uid){
        console.log(uid);
      }else{
      }
    } else {
      router.navigate(['login']);
    }
  });
};
