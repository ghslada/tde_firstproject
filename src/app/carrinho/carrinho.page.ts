import { UserCredential, Auth } from 'firebase/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Auth, onAuthStateChanged } from 'firebase/auth';
import { doc, DocumentData,  getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, verificaSeLogado } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  Id: number;
  Tecido: string;
  //ilhos ou deslizante (acessorio obrigatorio, que compoe a cortina)
  Acessorio: string;
  Largura: number;
  Altura: number;
  Qtd: number;
  Valor: number;
  Metros: number;
  Valor_tecido: number;
  Partes: number;
  Proporcao: number;
  Imagem: string;

  Carrinho: any = [];
  carrinho: any = [];
  produtos: any = [];

  Ob: Observable<any>;

  constructor(router: Router) {
    verificaSeLogado(router);
    // this.onChange();
    
    onAuthStateChanged(auth, async (UserCredential) => {
      await this.onChange(auth.currentUser);
    });

    // await this.getCarrinho();
    // await this.onChange();


    
   }

   async onChange(currentUser){
    await this.getCarrinho(auth);
    const unsub = onSnapshot(doc(db, "carrinho", currentUser.uid), async (doc) => {
      console.log("Current data: ", doc.data());
    });
   }

   async getCarrinho(auth: Auth) {
    if(auth.currentUser){
      const citiesCol = doc(db, 'carrinho', auth.currentUser.uid);
      this.produtos=[];
      await getDoc(citiesCol)
      .then(docSnapshot => {
        if(docSnapshot.data()) {
          this.Carrinho.push(docSnapshot.data());
          // console.log(docSnapshot.data());
        }else{
          console.log("Firestore vazio.");
        }
      }).catch(err => { 
        console.log(err);
      });
      this.carrinho = this.Carrinho[0];
      const tot = this.getSize(this.carrinho);
      const key = this.getKeys(this.carrinho);
      console.log(this.carrinho);
      for(let index = 0; index < tot; index++) {
        const element = this.carrinho[Number(key[index])];
        this.produtos.push(element);
      }
        console.log(this.produtos);
    }
  }

  getKeys(obj){
    const key = Object.keys(obj);
    return key;
  }

  getSize(obj){
    const total: number = Object.keys(obj).length;
    return total;
  }

  async ngOnInit() {
  
  
  }

}
