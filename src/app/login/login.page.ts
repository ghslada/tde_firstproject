/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { getAuth, signInWithEmailAndPassword, Auth, onAuthStateChanged, UserCredential } from "firebase/auth";
import { Component, Inject, OnInit } from '@angular/core';
import { auth, fireApp } from "../firebaseConfig";
import { Router } from "@angular/router";
import { isNull } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // auth = getAuth(fireApp);
  Email: string;
  Senha: string;
  User: UserCredential;

  constructor(private router: Router) {
    this.verificaLogin();
   }

  verificaLogin(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const local = 'tabs/tabProdutos';
        if(user.uid){
          this.router.navigate(['tabs/', 'tabProdutos']);
        }else{
          // console.log("Você não está logado.");
        }
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }



  login(){
    signInWithEmailAndPassword(auth, this.Email, this.Senha)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const local = 'tabs/tabProdutos';
      this.router.navigate(['tabs/', 'tabProdutos']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log("ERROR CODE: "+errorCode);
      alert("ERROR MESSAGE: "+errorMessage);
    });
  }

  ngOnInit() {
    
  }

}
