import { Routes } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './page/home/home.component';
import { ContatoComponent } from './page/contato/contato.component';

export const routes: Routes = [
    {path:'',component:HeaderComponent},
    {path:'home',component:HomeComponent},
    {path:'contato',component:ContatoComponent},
];

export class AppRoutes {}
