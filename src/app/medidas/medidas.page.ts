import { doc, getDoc, setDoc } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/no-shadow */
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
import { auth, carrinho, db, produto, verificaSeLogado } from '../firebaseConfig';
import { Observable } from 'rxjs';

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

  Observabllle: Observable<any>;
  Tipo: string;

  constructor(private router: Router) {
    console.log(carrinho);
    verificaSeLogado(router);
   }

  //SE A ALTURA FOR MAIOR QUE 2.7 o número de partes será pré definido
  nroPartes(){
    let cont=1;
    if(this.Altura>=2.70){
      let metros = this.Largura*this.Proporcao;
      while(metros>0){
        metros=metros-2.70;
        if (metros%2.70>=0){
          if(metros>0){
            cont++;
          }
        }else{

        }
      }
      this.Partes=cont;
      this.MetrosLinearesDeTecido=this.Altura*this.Partes;
    }else{
      this.MetrosLinearesDeTecido=this.Largura*this.Proporcao;
    }
    if(this.MetrosLinearesDeTecido && this.Altura && this.Partes && this.Proporcao && this.Largura){
        alert("Sua cortina será dividida em "+this.Partes+" partes.");
        
    }
  }

  setMedidas(){
    try{
      if (this.Medidas.lenght>=1) {
        var last=this.Medidas.lastIndexOf();
      }else{
        //VERIFICA SE TODOS OS CAMPOS FORAM INFORMADOS.
        if (this.Altura && this.Largura && this.Proporcao && this.Partes){

          if (this.Proporcao*this.Largura/this.Partes<=0.5) {
            alert("Cada parte da cortina deve ter no mínimo 40cm.");
          }else{
            produto.medidas.altura=this.Altura;
            produto.medidas.largura=this.Largura;
            produto.medidas.proporcao=this.Proporcao;
            produto.medidas.partes=this.Partes;
            produto.medidas.metros_lineares=this.MetrosLinearesDeTecido;
            console.log(produto);
            this.router.navigate(['tabs/', 'tabAcessorio']);
          }
        }else{
          alert("Todos os campos são obrigatórios.");
        }
      }

    }catch(err){
      console.log(err);
    }
    // await this.setProduto();
  }

  async observarModificacoesDoTipoDeSistema(){

    this.Observabllle = new Observable(subscriber => {
      // console.log("Hello world");
      this.Tipo=produto.sistema;
      subscriber.next(produto.sistema);
    });

    setInterval(async () => {
      this.Observabllle.subscribe(x => {

          if(x!==produto.sistema){
            console.log(x);
            this.Tipo=x;
            x=produto.sistema;
          }

          // console.log("completed");


      });
    }, 200);

  }

  

  async ngOnInit() {
    await this.observarModificacoesDoTipoDeSistema();
  }

}
