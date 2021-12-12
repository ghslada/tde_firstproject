import { setDoc } from 'firebase/firestore';
/* eslint-disable max-len */
/* eslint-disable no-var */
import { fireApp } from './../firebaseConfig';
/* eslint-disable prefer-const */
import { UserCredential } from 'firebase/auth';
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
import { HttpClient } from '@angular/common/http';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as firebase from 'firebase/storage';
import { Observable } from 'rxjs';

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
  Url: string;

  selectedFile = null;
  Ob: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    verificaSeLogado(router);
    const unsub = onAuthStateChanged(auth, async (UserCredential) => {
      await this.getUserData(auth.currentUser);
    });
    this.Ob = new Observable(subscriber => {
      subscriber.next(unsub.length);
    });
    this.Ob.subscribe(subscript => {
      setInterval(() => {
        if(subscript!=unsub.length){
          console.log(subscript);
          console.log('Dados do usuário foram alterados.');
          subscript=unsub.length;
        }
      },100);
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
          this.Url = this.User[0].url_img_perfil;
        }else{
        alert("Firestore vazio.");
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  async arquivoSelecionado(event){
    // event.target.files[0].name=String(auth.currentUser.uid);
    this.selectedFile = event.target.files[0];
    // Create a root reference
    const storageRef = getStorage(fireApp, 'gs://ecommercecortinastde.appspot.com/');
    console.log(storageRef);
    // Create a reference to 'mountains.jpg'
    console.log(this.selectedFile);
    const reff = ref(storageRef, 'usuarios/'+auth.currentUser.uid);
    // firebase.updateMetadata()
    // const meta = await firebase.getMetadata(ref.parent);
    // connectStorageEmulator(storageRef, 'localhost', 5001);
    // console.log(re
    console.log(reff);
    const result = await uploadBytesResumable(reff, this.selectedFile);
    const url = await getDownloadURL(reff);
    this.updateImagemDoUser(url);
    console.log(url);
    console.log(result);

    // Create a reference to 'images/mountains.jpg'
    // var mountainImagesRef = storageRef.child('images/mountains.jpg');

    // // While the file names are the same, the references point to different files
    // mountainsRef.name === mountainImagesRef.name            // true
    // mountainsRef.fullPath === mountainImagesRef.fullPath    // false
  }

  uploadImagem(){
    // this.http.post('');
    const input = document.getElementById("image_input");
    input.click();
  }

  async updateImagemDoUser(url){
    // const storageRef = getStorage(fireApp, 'gs://ecommercecortinastde.appspot.com/');
    // const reff = ref(storageRef, 'usuarios/'+auth.currentUser.uid);
    // const url = await getDownloadURL(reff);
    console.log(url);
    const usuario = doc(db,'usuarios', auth.currentUser.uid);
    await setDoc(usuario, {
      url_img_perfil: url,    
    }, { merge: true }).then((dossc) => {
      const local = 'tabs/tabPerfil';
      window.location.href=local;
    }).catch(err => alert(err));
  }

  ngOnInit() {
  }

}
