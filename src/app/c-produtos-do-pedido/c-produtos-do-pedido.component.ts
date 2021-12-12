/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-produtos-do-pedido',
  templateUrl: './c-produtos-do-pedido.component.html',
  styleUrls: ['./c-produtos-do-pedido.component.scss'],
})
export class CProdutosDoPedidoComponent implements OnInit {
  // @Input()
  // Produto: any = [{Qtd: 0, Acessorio: '', Tecido: '', Altura: 0, Largura: 0, MetrosLineares: 0, Proporcao: 0}];
  @Input()
  Produtos: any = [];
  @Input()
  Produto: any;
  @Input()
  Qtd: number;
  @Input()
  Acessorio: string;
  @Input()
  Tecido: string;
  @Input()
  Altura: number;
  @Input()
  Largura: number;
  @Input()
  MetrosLineares: number;
  @Input()
  Proporcao: number;
  @Input()
  Id: number;
  @Input()
  Index: number;
  @Input()
  Data: Date;
  @Input()
  Imagem: string;


  constructor() { }

  ngOnInit() {}

}
