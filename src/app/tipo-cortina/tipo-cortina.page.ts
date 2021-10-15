/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-cortina',
  templateUrl: './tipo-cortina.page.html',
  styleUrls: ['./tipo-cortina.page.scss'],
})
export class TipoCortinaPage implements OnInit{
  tipoSelecionado='ilhos';
  // eslint-disable-next-line quote-props
  tipos=[{nome : 'ilhos', texto: 'Varão com ilhós' , 'imagesrc' :'assets/img/ilhos.png'}];

  constructor() { }

  ngOnInit() {
  }

}
