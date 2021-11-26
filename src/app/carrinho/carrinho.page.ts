/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { auth, verificaSeLogado } from '../firebaseConfig';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  
  Tecido: string;
  //ilhos ou deslizante (acessorio obrigatorio, que compoe a cortina)
  Acessorio: string;
  Largura: string;
  Altura: string;
  Qtd: number;

  constructor(router: Router) {
    verificaSeLogado(router);
   }

  ngOnInit() {
  }

}
