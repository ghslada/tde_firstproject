/* eslint-disable eqeqeq */
import { CProdutosDoPedidoComponent } from './../c-produtos-do-pedido/c-produtos-do-pedido.component';
/* eslint-disable @typescript-eslint/naming-convention */
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
/* eslint-disable @typescript-eslint/dot-notation */
import { getDoc } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { onSnapshot, doc } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/no-shadow */
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { auth, db, verificaSeLogado } from '../firebaseConfig';


@Component({
  selector: 'app-componente-pedidos',
  templateUrl: './componente-pedidos.component.html',
  styleUrls: ['./componente-pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {

  // @Input()
  // Produto: any = [{Qtd: 0, Acessorio: '', Tecido: '', Altura: 0, Largura: 0, MetrosLineares: 0, Proporcao: 0}];
  @Input()
  Produtos: any = [];
  @Input()
  produtosfinal: any;


  @Input()
  Qtd: any;
  @Input()
  Acessorio: any;
  @Input()
  Tecido: any;
  @Input()
  Altura: any;
  @Input()
  Largura: any;
  @Input()
  MetrosLineares: any;
  @Input()
  Proporcao: any;
  @Input()
  Id: number;
  @Input()
  Index: number;
  @Input()
  Data: Date;
  @Input()
  Imagem: string;

  constructor() {}

  async getProdutos(){
    if(auth.currentUser){
      let pedidos=[];
      const Pedidos=[];
      this.produtosfinal=[];
      const citiesCol = doc(db, 'pedidos', auth.currentUser.uid);
      await getDoc(citiesCol)
      .then(docSnapshot => {
        if(docSnapshot.data()) {
          Pedidos.push(docSnapshot.data());
          // console.log(docSnapshot.data());
        }else{
          console.log("Firestore vazio.");
        }
      }).catch(err => { 
        console.log(err);
      });
      pedidos = Pedidos[0];
      if(pedidos){
        const tot = this.getSize(pedidos);
        const key = this.getKeys(pedidos);
        console.log(pedidos);
        for(let index = 0; index < tot; index++) {
          const element = pedidos[Number(key[index])];
          const totProds = this.getSize(element.dados_do_pedido);
          element.dados_do_pedido.forEach(prod => {
            if(prod.id==this.Id){
              this.produtosfinal.push(prod);
            }
          });
        }
          console.log(this.produtosfinal);
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


  async ngOnInit() {
    // this.Produtos.push(this.Produto);
    
    await this.getProdutos();
  }

}
