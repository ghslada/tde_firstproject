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
  constructor() { }

  ngOnInit() {
  }



  cadastrar(){
      createUserWithEmailAndPassword(auth, this.Email, this.Senha)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const uid = user.uid;
          // ...
          await setDoc(doc(db, "usuarios", uid), {
            nome: this.Nome,
            email: this.Email,
            senha: this.Senha
          }).then(() => {
            const local = 'tabs/tabProdutos';
            window.location.href=local;
          }).catch(err => console.log(err));
          

        })
        .catch((error) => {
          const errorCode = error.code;
          alert('Erro: '+ errorCode);
          // ..
        });
  }

}

