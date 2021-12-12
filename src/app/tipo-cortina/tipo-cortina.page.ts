/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-trailing-spaces */
import { Firestore } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/quotes */
import { collection, getDocs } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { auth, db, verificaSeLogado } from '../firebaseConfig';
import { Auth, onAuthStateChanged } from 'firebase/auth';
  // eslint-disable-next-line quote-props
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-cortina',
  templateUrl: './tipo-cortina.page.html',
  styleUrls: ['./tipo-cortina.page.scss'],
})
export class TipoCortinaPage implements OnInit{


  Id: number;

  Tipo: string;

  Imagem: string;

  Escolha: number;

  // tipos=[{nome : 'ilhos', texto: 'Varão com ilhós' , 'imagesrc' :'assets/img/ilhos.png'}];

  Sistemas: any = [];

  constructor(router: Router) {

    //IMPORTADO DO ARQUIVO FIREBASECONFIG
    verificaSeLogado(router);  

   }
   async getSistemas(){
    const citiesCol = collection(db, 'tipo-sistema');
    const citySnapshot = await getDocs(citiesCol);
    // const snap = citySnapshot.docChanges();
    if (citySnapshot.empty) {
      console.log("Firestore vazio.");
    }else{
      citySnapshot.docs.forEach(doc => {
        // console.log(doc.data());
        this.Sistemas.push(doc.data());
      });
      console.log(this.Sistemas);
      // snap.map(s => console.log(s.doc.data()));
    }
  }

  ngOnInit() {
    this.getSistemas();
  }

  

}
