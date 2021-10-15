import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcessorioPageRoutingModule } from './acessorio-routing.module';

import { AcessorioPage } from './acessorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcessorioPageRoutingModule
  ],
  declarations: [AcessorioPage]
})
export class AcessorioPageModule {}
