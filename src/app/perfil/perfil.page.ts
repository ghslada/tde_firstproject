/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { isDefined } from '@angular/compiler/src/util';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, Auth, onAuthStateChanged, UserCredential } from "firebase/auth";
import { doc, getDoc, Firestore } from "firebase/firestore";
import { auth, db, verificaSeLogado } from '../firebaseConfig';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

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

  logout(router?: Router){
    auth.signOut().then(() => {
      alert('Loged out');
      // router.navigate(['login']);
    }).catch(error => {
      alert('Recarregue a pagina, erro: '+ error.message);
    });
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
