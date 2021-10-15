import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcessorioPage } from './acessorio.page';

const routes: Routes = [
  {
    path: '',
    component: AcessorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcessorioPageRoutingModule {}
