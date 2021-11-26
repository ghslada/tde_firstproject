/* eslint-disable prefer-const */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-shadow */
import { observable, Observable } from 'rxjs';
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, Inject, OnInit } from '@angular/core';
import { auth, carrinho, db, verificaSeLogado } from '../firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Auth, onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  // data = this.getCities(this.db);

  // Get a list of cities from your database
  
  // QtdProdutos: number;
  Escolha: string;
  Options: any = [];
  PRODUTOS = [];
  Produtos: Array<any>=[];
  Ob: Observable<any>;

  constructor(router: Router) {
    this.Escolha='Todos';
    this.getTecidos();
    this.getTiposDeTecido();
    verificaSeLogado(router);
    console.log(auth);
  }

  async getTecidos() {
    const citiesCol = collection(db, 'tecidos');
    const citySnapshot = await getDocs(citiesCol);
    if (citySnapshot.empty) {
      console.log("Firestore vazio.");
    }else{
      if(this.Escolha === 'Todos'){
        this.Produtos=[];
        this.PRODUTOS=[];
        citySnapshot.docs.forEach(doc => {
          this.Produtos.push(doc.data());
        });
      }else{
        let index=0;
        this.Produtos=[];
        this.PRODUTOS=[];
        citySnapshot.docs.forEach(doc => {
          this.PRODUTOS[index]=(doc.data());
          if (this.PRODUTOS[index]['Tipo']===this.Escolha) { 
            this.Produtos.push(this.PRODUTOS[index]);
          }
          index++;
        });
      }
      console.log(this.Produtos);
      // snap.map(s => console.log(s.doc.data()));
    }
  }

  async getTiposDeTecido(){
    const citiesCol = collection(db, 'tecidos');
    const citySnapshot = await getDocs(citiesCol);
    if (citySnapshot.empty) {
      console.log("Firestore vazio.");
    }else{
      let index=0;
      citySnapshot.forEach(doc => {
        this.Options.push(doc.data());
        // let d1 = document.getElementById('mySelect');
        // console.log(d1);
        // d1.appendChild();
        index++;
      });
      console.log(this.Produtos);
      // snap.map(s => console.log(s.doc.data()));
    }
  }

  ngOnInit() {}
}
