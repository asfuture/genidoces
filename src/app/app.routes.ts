import { ListaPedidoComponent } from './shared/views/componentes/lista-pedido/lista-pedido.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './shared/views/page/home/home.component';
import { ContatoComponent } from './shared/views/page/contato/contato.component';
import { LoginComponent } from './shared/views/page/login/login.component';
import { CadastrarUsuarioComponent } from './shared/views/page/cadastrar-usuario/cadastrar-usuario.component';
import { CriarCardComponent } from './shared/views/page/criar-card/criar-card.component';
import { AdministradorComponent } from './shared/views/page/administrador/administrador.component';


export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'contato',component:ContatoComponent},

    {path:'login',component:LoginComponent},
    {path:'administrador',component:AdministradorComponent},
    {path:'cadastrar',component: CadastrarUsuarioComponent},
    {path:'criarCard',component:CriarCardComponent},
    {path:'listapedido',component:ListaPedidoComponent}
    
];

export class AppRoutes {}
