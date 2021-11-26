/* eslint-disable @typescript-eslint/no-shadow */
import { isDefined } from '@angular/compiler/src/util';
/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from '@firebase/util';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { auth, carrinho, produto, verificaSeLogado } from '../firebaseConfig';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.page.html',
  styleUrls: ['./medidas.page.scss'],
})
export class MedidasPage implements OnInit {
  Altura: number ;
  Largura: number ;
  Proporcao: number ;
  Partes: number ;
  Medidas: any = [];
  MetrosLinearesDeTecido: number;

  constructor(private router: Router) {
    console.log(carrinho);
    verificaSeLogado(router);
   }

  //SE A ALTURA FOR MAIOR QUE 2.8 o número de partes será pré definido
  nroPartes(){
    let cont=1;
    if(this.Altura>=2.85){
      let metros = this.Largura*this.Proporcao;
      while(metros>0){
        metros=metros-2.85;
        if (metros%2.85>=0){
          if(metros>0){
            cont++;
          }
        }else{

        }
      }
      this.Partes=cont;
      this.MetrosLinearesDeTecido=this.Altura*this.Partes*this.Proporcao;
    }else{
      this.MetrosLinearesDeTecido=this.Largura*this.Proporcao;
    }
    // alert(`Nmr de partes: ${this.Partes}`);
    // this.Partes=cont;
    if(this.MetrosLinearesDeTecido && this.Altura){
        alert(this.Partes);
    }
  }

  setMedidas(){
    try{
      if (this.Medidas.lenght>=1) {
        var last=this.Medidas.lastIndexOf();
      }else{
        //VERIFICA SE TODOS OS CAMPOS FORAM INFORMADOS.
        if (this.Altura && this.Largura && this.Proporcao && this.Partes){
          produto.medidas.altura=this.Altura;
          produto.medidas.largura=this.Largura;
          produto.medidas.proporcao=this.Proporcao;
          produto.medidas.partes=this.Partes;
          produto.medidas.metros_lineares=this.MetrosLinearesDeTecido;
          console.log(produto);
          this.router.navigate(['tabs/', 'tabAcessorio']);
        }
      }

    }catch(err){
      console.log(err);
    }
  }

  ngOnInit() {
  }

}
