/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
    onAuthStateChanged(auth, () => {
      this.getUserData(auth.currentUser);
    });
  }

  logout(){
    auth.signOut().then(() => {
      // alert('Loged out');
    }).catch(error => {
      alert('Recarregue a pagina, erro: '+ error.message);
    });
  }

  async getUserData(currentUser: User) {
    // const uid = auth.currentUser.uid;
    if(currentUser){
      const citiesCol = doc(db, 'usuarios', currentUser.uid);
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
