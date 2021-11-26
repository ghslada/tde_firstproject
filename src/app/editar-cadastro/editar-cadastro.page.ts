/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from 'firebase/auth';
import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, verificaSeLogado } from '../firebaseConfig';

@Component({
  selector: 'app-editar-cadastro',
  templateUrl: './editar-cadastro.page.html',
  styleUrls: ['./editar-cadastro.page.scss'],
})
export class EditarCadastroPage implements OnInit {

  User: any = [];
  Nome: string;
  Email: string;
  Senha: string;
  DataNasc: string;
  Endereco: string;
  Cep: string;
  Estado: string;
  Cpf: string;

  constructor(router: Router) {
    verificaSeLogado(router);
    this.getUserData(db);
   }

  async updateDadosDoUser(){
    const usuario = doc(db,'usuarios', auth.currentUser.uid);
    await setDoc(usuario, {
      nome: this.Nome,
      email: this.Email,
      senha: this.Senha,
      dataNasc: this.DataNasc,
      endereco: this.Endereco,
      cep: this.Cep,
      estado: this.Estado,
      cpf: this.Cpf     
    }).then((dossc) => {
      const local = 'tabs/tabProdutos';
      window.location.href=local;
    }).catch(err => alert(err));
  }

  async getUserData(db: Firestore) {
    // const uid = auth.currentUser.uid;
    if(auth.currentUser){
      const citiesCol = doc(db, 'usuarios', auth.currentUser.uid);
      await getDoc(citiesCol)
      .then(docSnapshot => {
        if(docSnapshot.data()) {
          this.User.push(docSnapshot.data());
          console.log(docSnapshot.data());
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.Cpf = this.User[0]['cpf'];
          this.Nome = this.User[0]['nome'];
          this.Email = this.User[0]['email'];
          this.Senha = this.User[0]['senha'];
          this.DataNasc = this.User[0]['dataNasc'];
          this.Endereco = this.User[0]['endereco'];
          this.Cep = this.User[0]['cep'];
          this.Estado = this.User[0]['estado'];
        }else{
        alert("Firestore vazio.");
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  ngOnInit() {
  }

}
