import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutosComponent } from '../componente-produto/produtos.component';
import { TipoSistemaComponent } from '../componente-tipo-sistema/componente-tipo-sistema.component';
import { CarrinhoComponent } from '../componente-carrinho/carrinho.component';


@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [ TipoSistemaComponent, ProdutosComponent, CarrinhoComponent],
    exports: [TipoSistemaComponent, ProdutosComponent, CarrinhoComponent]
})
export class ComponentsModule {}
