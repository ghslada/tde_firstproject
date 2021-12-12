/* eslint-disable prefer-const */
import { Observable, of, Subscriber } from 'rxjs';

import { map } from 'rxjs/operators';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where  } from 'firebase/firestore';
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
  Image_url: string;

  Acessorios: any = [];
  Sistema: string;
  Ob: Observable<any>;


  constructor(private router: Router) {
    verificaSeLogado(router);   
    
    
   }

   voltar(){
    this.router.navigate(['tabs/', 'tabMedidas']);
   }

   

   
   async getAcessorios(){
    this.Sistema=produto.sistema;
     //PEGA SOMENTE O SISTEMA SELECIONADO
    const citiesCol = query(collection(db, "acessorio"), where("Tipo", "==", this.Sistema));
    // const citySnapshot1= await getDoc(getDocs(citiesCols));
    // const citiesCol = collection(db, 'acessorio');
    const citySnapshot = await getDocs(citiesCol);
    // const snap = citySnapshot.docChanges();
    if (citySnapshot.empty) {
      console.log("Firestore vazio.");
    }else{
      this.Acessorios=[];
      citySnapshot.docs.forEach(doc => {
        // console.log(doc.data());
        this.Acessorios.push(doc.data());
        console.log(this.Acessorios);

    });
      
    }
  }

      
    //Observa as mudanças no tipo de sistema selecionado para exibir
    //o novo tipo de sistema escolhido.
  async observarModificacoesDoTipoDeSistema(){

    this.Ob = new Observable(subscriber => {
      // console.log("Hello world");
      subscriber.next(produto.sistema);
    });

    this.Ob.subscribe(x => {
      setInterval(async () => {
        if(x!==produto.sistema){
          console.log(x);
          await this.getAcessorios();
          x=produto.sistema;
        }

        // console.log("completed");
      }, 1000);
    });
  }

  async ngOnInit() {
    await this.observarModificacoesDoTipoDeSistema();
    await this.getAcessorios();



  }
  
}

