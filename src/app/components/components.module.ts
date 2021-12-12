import { CProdutosDoPedidoComponent } from './../c-produtos-do-pedido/c-produtos-do-pedido.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutosComponent } from '../componente-produto/produtos.component';
import { TipoSistemaComponent } from '../componente-tipo-sistema/componente-tipo-sistema.component';
import { CarrinhoComponent } from '../componente-carrinho/carrinho.component';
import { PedidosComponent } from './../componente-pedidos/componente-pedidos.component';
import { CAcessorioComponent } from '../c-acessorio/c-acessorio.component';


@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [ TipoSistemaComponent, ProdutosComponent,
        CarrinhoComponent, CAcessorioComponent, PedidosComponent, CProdutosDoPedidoComponent],
    exports: [TipoSistemaComponent, ProdutosComponent,
        CarrinhoComponent, CAcessorioComponent, PedidosComponent, CProdutosDoPedidoComponent]
})
export class ComponentsModule {}
