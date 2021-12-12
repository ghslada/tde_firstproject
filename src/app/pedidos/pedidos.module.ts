import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPageRoutingModule } from './pedidos-routing.module';

import { PedidosPage } from './pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PedidosPage]
})
export class PedidosPageModule {}
