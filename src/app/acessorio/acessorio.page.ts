/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db, produto, verificaSeLogado } from '../firebaseConfig';

@Component({
  selector: 'app-acessorio',
  templateUrl: './acessorio.page.html',
  styleUrls: ['./acessorio.page.scss'],
})
export class AcessorioPage implements OnInit {
  Tipo: string;
  Cor: string;
  Valor: number;

  Acessorios: any = [];
  Sistema: string = produto.sistema;


  constructor(router: Router) {
    verificaSeLogado(router);
    
    
   }

   
   async getAcessorios(){
     //PEGA SOMENTE O SISTEMA SELECIONADO
    const citiesCol = query(collection(db, "acessorio"), where("Tipo", "==", this.Sistema));
    // const citySnapshot1= await getDoc(getDocs(citiesCols));
    // const citiesCol = collection(db, 'acessorio');
    const citySnapshot = await getDocs(citiesCol);
    // const snap = citySnapshot.docChanges();
    if (citySnapshot.empty) {
      console.log("Firestore vazio.");
    }else{
      citySnapshot.docs.forEach(doc => {
        // console.log(doc.data());
        this.Acessorios.push(doc.data());
    });
    
      console.log(this.Acessorios);
    }
  }

  async ngOnInit() {
    await this.getAcessorios();
  }

}
