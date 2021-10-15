import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoCortinaPageRoutingModule } from './tipo-cortina-routing.module';

import { TipoCortinaPage } from './tipo-cortina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoCortinaPageRoutingModule
  ],
  declarations: [TipoCortinaPage]
})
export class TipoCortinaPageModule {}
