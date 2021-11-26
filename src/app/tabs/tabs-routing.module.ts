import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabPerfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'tabProdutos',
        loadChildren: () => import('../produtos/produtos.module').then(m => m.ProdutosPageModule)
      },
      {
        path: 'tabCarrinho',
        loadChildren: () => import('../carrinho/carrinho.module').then(m => m.CarrinhoPageModule)
      },
      {
        path: 'tabPedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then(m => m.PedidosPageModule)
      },
      {
        path: 'tabTipoCortina',
        loadChildren: () => import('../tipo-cortina/tipo-cortina.module').then(m => m.TipoCortinaPageModule)
      },
      {
        path: 'tabMedidas',
        loadChildren: () => import('../medidas/medidas.module').then(m => m.MedidasPageModule)
      },
      {
        path: 'tabAcessorio',
        loadChildren: () => import('../acessorio/acessorio.module').then(m => m.AcessorioPageModule)
      },
      {
        path: 'tabEditarDados',
        loadChildren: () => import('../editar-cadastro/editar-cadastro.module').then(m => m.EditarCadastroPageModule)
      },
      // {
      //   path: 'tabLogin',
      //   loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      // },
      // {
      //   path: 'tabCadastro',
      //   loadChildren: () => import('../cadastro/cadastro.module').then(m => m.CadastroPageModule)
      // },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
