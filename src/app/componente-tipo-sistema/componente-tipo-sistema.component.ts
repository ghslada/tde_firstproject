/* eslint-disable @typescript-eslint/quotes */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { auth, carrinho, db, produto } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-componente-tipo-sistema',
  templateUrl: './componente-tipo-sistema.component.html',
  styleUrls: ['./componente-tipo-sistema.component.scss'],
})

export class TipoSistemaComponent implements OnInit {

  @Input()
  Id: number;
  @Input()
  Tipo: string;
  @Input()
  Imagem: string;
  @Input()
  Escolha: string;

  constructor(private router: Router) { }

  selecionarTipo(){
      this.Escolha = this.Tipo;
      produto.sistema=this.Escolha;
      console.log(produto);
      this.router.navigate(['/tabs/tabProdutos']);
  }



  ngOnInit() {}


}
