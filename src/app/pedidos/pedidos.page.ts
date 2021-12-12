/* eslint-disable @typescript-eslint/dot-notation */
import { getDoc } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { onSnapshot, doc } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { auth, db, verificaSeLogado } from '../firebaseConfig';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  
  Ob: Observable<any>;
  pedidos: any = [];
  Pedidos: any = [];
  pedidosfinal: any =[];
  produtos: any = [];

  constructor(router: Router) {
    verificaSeLogado(router);
   }
  
   async getPedidos(){
     if(auth.currentUser){
       this.pedidos=[];
       this.Pedidos=[];
       this.pedidosfinal=[];
       const citiesCol = doc(db, 'pedidos', auth.currentUser.uid);
       await getDoc(citiesCol)
       .then(docSnapshot => {
         if(docSnapshot.data()) {
           this.Pedidos.push(docSnapshot.data());
           // console.log(docSnapshot.data());
         }else{
           console.log("Firestore vazio.");
         }
       }).catch(err => { 
         console.log(err);
       });
       this.pedidos = this.Pedidos[0];
       if(this.pedidos){
         const tot = this.getSize(this.pedidos);
         const key = this.getKeys(this.pedidos);
         console.log(this.pedidos);
         for(let index = 0; index < tot; index++) {
           const element = this.pedidos[Number(key[index])];
           this.pedidosfinal.push(element);
         }
           console.log(this.pedidosfinal);
       }else{
         console.log('Documento de pedidos vazio');
       }

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

  ngOnInit() {
            // await this.onChange(auth.currentUser);
            onAuthStateChanged(auth, async () => {


              // if (auth.currentUser) {
                const unsub = onSnapshot(doc(db, 'carrinho', auth.currentUser.uid), async (doc) => {
                  console.log("Current data: "+ doc.data());
                  await this.getPedidos();
                });
        
                this.Ob = new Observable(subscriber => {
                  subscriber.next(unsub.length);
                });
        
                this.Ob.subscribe(data => {
                  console.log(data);
                  setInterval(async () => {
                    if(data !== unsub.length){
                      await this.getPedidos();
                      data=unsub.length;
                    }
                  }, 200);
                });
        
              // }else{
              //   await this.getCarrinho();
              // }
              
            });
  }

}
