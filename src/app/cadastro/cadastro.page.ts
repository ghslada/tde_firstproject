import { Firestore } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from '../firebaseConfig';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  Nome: string;
  Email: string;
  Senha: string;
  DataNasc: string;
  Endereco: string;
  Cep: string;
  Estado: string;
  Cpf: string;

  constructor() { }

  ngOnInit() {
  }

  apagarCampos(){
    this.Nome='';
    this.Email='';
    this.Senha='';
    this.DataNasc='';
    this.Endereco='';
    this.Cep='';
    this.Estado='';
    this.Cpf='';
  }

  cadastrar(){
      createUserWithEmailAndPassword(auth, this.Email, this.Senha)
        .then(async (userCredential) => {
          // Signed in
          // const user = userCredential.user;
          // const uid = user.uid;
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
          

        })
        .catch((error) => {
          const errorCode = error.code;
          alert('Erro: '+ errorCode);
          // ..
        });
  }

}

