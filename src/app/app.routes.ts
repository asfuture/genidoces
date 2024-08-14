import { Routes } from '@angular/router';
import { HomeComponent } from './shared/views/page/home/home.component';
import { ContatoComponent } from './shared/views/page/contato/contato.component';
import { LoginComponent } from './shared/views/page/login/login.component';
import { ListaCardComponent } from './shared/views/componentes/lista-card/lista-card.component';
import { CadastrarUsuarioComponent } from './shared/views/page/cadastrar-usuario/cadastrar-usuario.component';
import { CriarCardComponent } from './shared/views/page/criar-card/criar-card.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'cadastrar',component: CadastrarUsuarioComponent},
    {path:'criarCard',component:CriarCardComponent},
    {path:'contato',component:ContatoComponent},
];

export class AppRoutes {}
