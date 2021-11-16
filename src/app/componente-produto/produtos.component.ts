/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  // produtos = async (db: Firestore) => {
  //   const produtosCol = collection(db, 'produtos');
  //   const produtosSnapshot = await getDocs(produtosCol);
  //   const produtosList = produtosSnapshot.docs.map(doc => doc.data());
  //   return produtosList;
  // };

  setTecido(){
    return;
  }

  ngOnInit() {}

}
