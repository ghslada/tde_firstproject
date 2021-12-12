/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.page.html',
  styleUrls: ['./redefinir-senha.page.scss'],
})
export class RedefinirSenhaPage implements OnInit {
  Email: string;
  Mensagem: boolean;
  constructor() { }

  redefinirSenha(){
    
    const auth = getAuth();
    this.Mensagem=false;
    sendPasswordResetEmail(auth, this.Email)
      .then(() => {
        // Password reset email sent!
        this.Mensagem=true;
        // .. 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Erro: "+error.code);
        // ..
      });
  }

  ngOnInit() {
  }

}
