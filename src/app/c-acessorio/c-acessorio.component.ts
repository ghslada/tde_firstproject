/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getDocs, collection } from 'firebase/firestore';
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { auth, db, produto } from '../firebaseConfig';
import { setDoc, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-c-acessorio',
  templateUrl: './c-acessorio.component.html',
  styleUrls: ['./c-acessorio.component.scss'],
})
export class CAcessorioComponent implements OnInit {
  @Input()
  Tipo: string;
  @Input()
  Cor: string;
  @Input()
  Valor: number;
  @Input()
  Image_url: string;
  
  Escolha: string;

  // QtdProdutos: any = [];


  constructor(private router: Router) { }

  async selecionarAcessorio(){
    const nome = this.Tipo.split(' ');
    this.Escolha = nome[0] + ' ' + this.Cor;
    produto.acessorio.descricao=this.Escolha;
    produto.acessorio.valor=produto.medidas.largura*produto.medidas.proporcao*this.Valor;
    await this.definirValorDoProduto();
    await this.setProduto();
    console.log(produto);
    const local = '/tabs/tabCarrinho';
    window.location.href=local;
}

  async definirValorDoProduto(){
    if(produto.medidas.altura>=2.7){
      produto.valor=produto.acessorio.valor+(produto.valor_tecido*produto.medidas.altura*produto.medidas.partes);
    }else{
      produto.valor=produto.acessorio.valor+(produto.valor_tecido*produto.medidas.metros_lineares);
    }
    produto.id = await this.getLastProduto();
  }

 
  async setProduto(){
      const carrinho_usuario = doc(db, 'carrinho', auth.currentUser.uid);
      const docsColl = doc(db, 'carrinho', auth.currentUser.uid);
      const docs = await getDoc(docsColl);
      const index = produto.id;
      await setDoc(doc(db, "carrinho", auth.currentUser.uid), {[index]: produto}, {merge: true}).then((dossc) => {
        console.log('Carrinho atualizado.');
      }).catch(err => alert(err));
  }

  async getLastProduto(){
    const doccc = doc(db, 'carrinho', auth.currentUser.uid);
    const docc = await getDoc(doccc);
    const produtos: any = [];
    produtos.push(docc.data());
    const tot = this.getSize(produtos[0]);
    const key = this.getKeys(produtos[0]);
    console.log(key);
    if(key[0]){
      const l = Number(key[tot-1]);
      const i = l+1;
      return i;
    }else{
      const i = 0;
      return i;
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

  ngOnInit() {}

}
