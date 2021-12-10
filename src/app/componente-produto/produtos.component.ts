/* eslint-disable no-trailing-spaces */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { auth, carrinho, db, produto } from '../firebaseConfig';
import { getDoc, doc, setDoc } from 'firebase/firestore';
// import { fireApp } from '../firebaseConfig';
// import { getFirestore, Firestore, collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-ion-c-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  @Input() Id: number;
  // TIPO DE TECIDO
  @Input() Tipo: string;
  @Input() Cor: string;
  @Input() Descricao: string;
  @Input() Imagem: string;
  @Input() Valor: number;
  @Input()
  Tecido: string;

  constructor(private router: Router) { }

  selecionarTecido(){
    this.Tecido = this.Tipo + " - " + this.Cor;
    produto.valor_tecido=this.Valor;
    produto.tecido = this.Tecido;
    produto.url_img= this.Imagem;
    console.log(produto);
    this.router.navigate(['tabs/tabMedidas']);
    
  }



  ngOnInit() {}

}
