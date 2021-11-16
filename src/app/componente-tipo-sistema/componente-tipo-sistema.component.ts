/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';

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
  Escolha: number;

  constructor() { }

  selecionarTipo(){
      this.Escolha = this.Id;
  }

  ngOnInit() {}


}
