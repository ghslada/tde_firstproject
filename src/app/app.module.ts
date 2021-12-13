
import { ComponentsModule } from './components/components.module';
import { initializeApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import {HttpClientModule}from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ComponentsModule, HttpClientModule, FirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
