/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {

  Tecido: string;
  //ilhos ou deslizante (acessorio obrigatorio, que compoe a cortina)
  Acessorio: string;
  Largura: string;
  Altura: string;
  Qtd: number;

  constructor() { }

  increment(){
    this.Qtd++;
  }

  decrement(){
    if(this.Qtd>=1){
      this.Qtd--;
    }
  }

  deletarItem(){
    return 'hello';
  }

  ngOnInit() {}

}
