/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { deleteField, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

@Component({
  selector: 'app-c-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {

  @Input()
  Id: number;
  @Input()
  Tecido: string;
  //ilhos ou deslizante (acessorio obrigatorio, que compoe a cortina)
  @Input()
  Acessorio: string;
  @Input()
  Largura: number;
  @Input()
  Altura: number;
  @Input()
  Qtd: number;
  @Input()
  Valor: number;
  @Input()
  Metros: number;
  @Input()
  Valor_tecido: number;
  @Input()
  Partes: number;
  @Input()
  Proporcao;
  @Input()
  Imagem;


  constructor() {
  }

  increment(){
    const valor_unitario = this.Valor/this.Qtd;
    this.Qtd++;
    const valor=this.Qtd*valor_unitario;
    this.Valor=Number(valor.toFixed(2));
  }

  decrement(){
    if(this.Qtd>1){
      const valor_unitario=this.Valor/this.Qtd;
      const valor=this.Valor-valor_unitario;
      this.Valor=Number(valor.toFixed(2));
      this.Qtd--;
    }
  }

  async deletarItem(){
    const id = this.Id;
    const docc = doc(db, 'carrinho', auth.currentUser.uid);
    await await updateDoc(docc, {[id]: deleteField()}).then((dossc) => {
      const local = '/tabs/tabCarrinho';
      window.location.href=local;
    }).catch(err => alert(err));
  }

  ngOnInit() {}

}
