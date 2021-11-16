import { isDefined } from '@angular/compiler/src/util';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, Auth, onAuthStateChanged, UserCredential } from "firebase/auth";
import { auth, fireApp } from '../firebaseConfig';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  // auth: Auth = getAuth(fireApp);

  constructor() { 
  }

  logout(){
    auth.signOut().then(() => {
      alert('Loged out');
      const local = '../../login';
      window.location.href=local;
    }).catch(error => {
      alert('Erro: '+ error.message);
    });
  }

  ngOnInit() {
  }

}
