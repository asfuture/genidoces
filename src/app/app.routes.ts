import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ContatoComponent } from './page/contato/contato.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'contato',component:ContatoComponent},
];

export class AppRoutes {}
