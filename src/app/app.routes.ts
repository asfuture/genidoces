import { Routes } from '@angular/router';
import { HomeComponent } from './shared/views/page/home/home.component';
import { ContatoComponent } from './shared/views/page/contato/contato.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'contato',component:ContatoComponent},
];

export class AppRoutes {}
