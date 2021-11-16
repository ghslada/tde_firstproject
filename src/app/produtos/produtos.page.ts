/* eslint-disable @typescript-eslint/no-shadow */
import { observable, Observable } from 'rxjs';
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, Inject, OnInit } from '@angular/core';
import { auth, db } from '../firebaseConfig';
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
  
  PRODUTOS = [
    {Id: 0, Tipo: "Voil", Cor: "Branco", Imagem: "assets/img/cortina.jpg",Descricao:"Tecido leve, com bom caímento, torna o ambiente agradável permitindo a entrada da luz natural", Valor: 21},
    {Id: 1, Tipo: "Forro", Cor: "Bege", Imagem: "assets/img/cortina2.jpg", Descricao:"Tecido leve, proteje móveis e o tecido da frente, diminui a intensidade do sol sem perder a luz natural que adentra o ambiente", Valor: 21},
  ];
  QtdProdutos: number;

  Produtos: Array<any>=[];

  constructor() {
    this.QtdProdutos=this.PRODUTOS.length;
    this.getCities(db);
    this.verificaSeLogado(auth);
    console.log(auth);
    // this.Produtos.push(this.data);
  }

  async getCities(db) {
    const citiesCol = collection(db, 'produtos');
    const citySnapshot = await getDocs(citiesCol);
    // const snap = citySnapshot.docChanges();
    if (citySnapshot.empty) {
      console.log("Firestore vazio.");
    }else{
      citySnapshot.docs.forEach(doc => {
        // console.log(doc.data());
        this.Produtos.push(doc.data());
      });
      console.log(this.Produtos);
      // snap.map(s => console.log(s.doc.data()));
    }
  }

  async setTecido(){
    return this.Produtos;
  }


  verificaSeLogado(auth: Auth){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.email;
        const local = 'tabs/tabProdutos';
        if(uid){
          // window.location.href=local;
          console.log(uid);
        }else{
        }
        // ...
      } else {
        // User is signed out
        window.location.href='/login';
        // ...
      }
    });
  }

  // exibeProdutos(value) {
  //     for (let i=0; i<this.QtdProdutos; i++){
  //       this.Produtos[i]['Tipo']=this.PRODUTOS[i].Tipo;
  //       this.Produtos[i]['Cor']=this.PRODUTOS[i].Cor;
  //       this.Produtos[i]['Descricao']=this.PRODUTOS[i].Descricao;
  //       this.Produtos[i]['Imagem']=this.PRODUTOS[i].Imagem;
  //       this.Produtos[i]['Valor']=this.PRODUTOS[i].Valor;
  //       console.log(this.PRODUTOS[i]);
  //     }
  // }

  ngOnInit() {}
}
