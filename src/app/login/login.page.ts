/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { getAuth, signInWithEmailAndPassword, Auth, onAuthStateChanged, UserCredential } from "firebase/auth";
import { Component, Inject, OnInit } from '@angular/core';
import { auth, fireApp } from "../firebaseConfig";
import { Router } from "@angular/router";
import { isNull } from "@angular/compiler/src/output/output_ast";
import { Observable } from "rxjs";

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
  Ob: Observable<any>;

  constructor(private router: Router) {
    this.verificaLogin();
   }

  verificaLogin(){
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const local = 'tabs/tabProdutos';
        if(user.uid){
          this.router.navigate(['tabs/', 'tabTipoCortina']);
        }else{
          // console.log("Você não está logado.");
        }
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    this.Ob = new Observable(subscriber => {
      subscriber.next(unsub.length);
    });
    this.Ob.subscribe((data) => {
      setInterval(() => {
        if(data!==unsub.length){
          // console.log('O valor do elemento observado mudou');
          this.verificaLogin();
          // console.log("valor mudou");
          data=unsub.length;
        }
      }, 200);
    });
  }



  login(){
    signInWithEmailAndPassword(auth, this.Email, this.Senha)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const local = 'tabs/tabProdutos';
      this.router.navigate(['tabs/', 'tabTipoCortina']);
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
