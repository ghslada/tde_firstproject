import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoCortinaPage } from './tipo-cortina.page';

const routes: Routes = [
  {
    path: '',
    component: TipoCortinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoCortinaPageRoutingModule {}
