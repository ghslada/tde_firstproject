/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { carrinho, produto } from '../firebaseConfig';

@Component({
  selector: 'app-componente-tipo-sistema',
  templateUrl: './componente-tipo-sistema.component.html',
  styleUrls: ['./componente-tipo-sistema.component.scss'],
})

export class TipoSistemaComponent implements OnInit {

  @Input()
  Id: number;
  @Input()
  Tipo: string;
  @Input()
  Imagem: string;
  @Input()
  Escolha: string;

  constructor() { }

  selecionarTipo(){
      this.Escolha = this.Tipo;
      produto.sistema=this.Escolha;
      console.log(produto);
  }

  ngOnInit() {}


}
