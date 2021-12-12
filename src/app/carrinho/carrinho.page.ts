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
import { doc, DocumentData, getDoc, onSnapshot, setDoc, deleteDoc, updateDoc, deleteField } from 'firebase/firestore';
import { auth, db, verificaSeLogado, pedido } from '../firebaseConfig';
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

  constructor(private router: Router) {
    verificaSeLogado(router);
    // this.onChange();
    
   

    // await this.getCarrinho();
    // await this.onChange();
   }

   async onChange(currentUser){
    await this.getCarrinho();
    
    // onSnapshot(doc(db, "carrinho", currentUser.uid), async (doc) => {
    //   console.log("Current data: ", doc.data());
    // });
   }

   async getCarrinho() {
    if(auth.currentUser){
      const citiesCol = doc(db, 'carrinho', auth.currentUser.uid);
      this.produtos=[];
      this.carrinho=[];
      this.Carrinho=[];
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
      if(this.carrinho){
        const tot = this.getSize(this.carrinho);
        const key = this.getKeys(this.carrinho);
        console.log(this.carrinho);

        for(let index = 0; index < tot; index++) {
          const element = this.carrinho[Number(key[index])];
          this.produtos.push(element);
        }
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

  async setPedido(){
      pedido.idpedido= await this.getLastPedido();
      let cont=0;
      this.produtos.forEach(produto => {
        pedido.dados_do_pedido.push(produto);
        pedido.dados_do_pedido[cont].id=pedido.idpedido;
        cont++;   
      });
      // pedido.idpedido=cont;     
      console.log(pedido);
      const index = pedido.idpedido;
      await setDoc(doc(db, 'pedidos', auth.currentUser.uid), {[index]: pedido}, {merge: true}).then(async () =>
      {
        await this.deletarCarrinho();
        this.produtos = [];
      })
      .catch(err => console.log(err));
      // await setDoc(doc(db, 'pedidos', auth.currentUser.uid), {[index]: pedido.dados_do_pedido }, {merge: true});
  }


  async getLastPedido(){
      const doccc = doc(db, 'pedidos', auth.currentUser.uid);
      const pedido: any = [];
      await getDoc(doccc).then(doc => {
        pedido.push(doc.data());
      });
      if(pedido[0]){
        console.log(pedido);
        const tot = this.getSize(pedido[0]);
        const key = this.getKeys(pedido[0]);
        console.log(tot);
        if(key[0]){
          const l = Number(tot+1);
          // const i = l+1;
          return l;
        }else{
          const i = 1;
          return i;
        }
      }else{
        return 1;
      }
  }

  async deletarCarrinho(){
    const id = this.Id;
    const docc = doc(db, 'carrinho', auth.currentUser.uid);
    const size = this.getSize(await getDoc(docc));
    for (let index = 0; index < size; index++) {
      // const element = array[index];
      await updateDoc(docc, {[index]: deleteField()}).then((dossc) => {
        // window.location.href=local;

      }).catch(err => alert(err));
    }
    // const local = '/tabs/tabCarrinho';
    this.router.navigate(['tabs/', 'tabPedidos']);
  }

//   async getLastProdutoNoPedido(){
//     const doccc = doc(db, 'pedidos', auth.currentUser.uid);
//     const docSnapshot = await getDoc(doccc);
//     const pedidoo: any = [];
//     pedidoo.push(docSnapshot.data());
//     const tot = this.getSize(pedidoo[]);
//     const key = this.getKeys(pedidoo);
//     console.log(key);
//     if(pedidoo[0]){
//       let cont=0;
//       pedidoo[cont].dados_do_pedido.forEach(produto => {
//         cont++;
//       });
//       return cont;
//     }
//     else{
//       const i = 0;
//       return i;
//     }

// }


  async ngOnInit() {
        // await this.onChange(auth.currentUser);
      onAuthStateChanged(auth, async () => {


      // if (auth.currentUser) {
        const unsub = onSnapshot(doc(db, 'carrinho', auth.currentUser.uid), async (doc) => {
          console.log("Current data: ", doc.data());
          await this.onChange(auth);
        });

        this.Ob = new Observable(subscriber => {
          subscriber.next(unsub.length);
        });

        this.Ob.subscribe(data => {
          console.log(data);
          setInterval(async () => {
            if(data !== unsub.length){
              await this.getCarrinho();
              data=unsub.length;
            }
          }, 500);
        });

      // }else{
      //   await this.getCarrinho();
      // }
      
    });
  }

}
