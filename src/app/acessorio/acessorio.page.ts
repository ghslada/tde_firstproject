/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { auth, verificaSeLogado } from '../firebaseConfig';

@Component({
  selector: 'app-acessorio',
  templateUrl: './acessorio.page.html',
  styleUrls: ['./acessorio.page.scss'],
})
export class AcessorioPage implements OnInit {

  constructor(router: Router) {
    verificaSeLogado(router);
   }

  ngOnInit() {
  }

}
