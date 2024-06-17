import { Component} from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { SessaoDocesComponent } from '../../componentes/sessao-doces/sessao-doces.component';
import { CarrosselComponent } from '../../componentes/carrossel/carrossel.component';
import { TextoComponent } from '../../componentes/texto/texto.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MenuComponent, FooterComponent, SessaoDocesComponent, CarrosselComponent, TextoComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {

  constructor( private route:Router){
  }
}
