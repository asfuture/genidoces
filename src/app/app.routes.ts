import { Routes } from '@angular/router';
import { HomeComponent } from './shared/views/page/home/home.component';
import { ContatoComponent } from './shared/views/page/contato/contato.component';
import { LoginComponent } from './shared/views/page/login/login.component';
import { ListaCardComponent } from './shared/views/componentes/lista-card/lista-card.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'lista',component:ListaCardComponent},
    {path:'contato',component:ContatoComponent},
];

export class AppRoutes {}
