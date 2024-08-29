import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarCardComponent } from '../criar-card/criar-card.component';
import { CadastrarUsuarioComponent } from "../cadastrar-usuario/cadastrar-usuario.component";
import { ListaPedidoComponent } from '../../componentes/lista-pedido/lista-pedido.component';
import { SessaoDocesComponent } from "../../componentes/sessao-doces/sessao-doces.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CriarCardComponent, CadastrarUsuarioComponent, ListaPedidoComponent, CommonModule, SessaoDocesComponent],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  criarCard:number = 1;
  cadastrarUsuario:number = 0;
  listaCardSessaoDoces:number = 0;
  listaPedido:number = 0;
  constructor(private router:Router) {
  }

  click(valor:number):void{
    switch (valor) {
     case 1:
         this.criarCard = 1
         this.cadastrarUsuario = 0
         this.listaCardSessaoDoces = 0
         this.listaPedido = 0
      break;
      case 2: 
         this.criarCard = 0
         this.cadastrarUsuario = 1
         this.listaCardSessaoDoces = 0
         this.listaPedido = 0
      break;
      case 3: 
         this.criarCard = 0
         this.cadastrarUsuario = 0
         this.listaCardSessaoDoces = 1
         this.listaPedido = 0
      break;
      case 4: 
         this.criarCard = 0
         this.cadastrarUsuario = 0
         this.listaCardSessaoDoces = 0
         this.listaPedido = 1
      break;
      default:
        this.criarCard = 1
    }
  }

  logout() {
    sessionStorage.setItem('isAuthenticated','');
    this.router.navigate(['/login']);
  }
}
