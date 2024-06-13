import { Component } from '@angular/core';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { CarrosselComponent } from '../../componentes/carrossel/carrossel.component';
import { TextoComponent } from '../../componentes/texto/texto.component';
import { FormularioComponent } from '../../componentes/formulario/formulario.component';
import { MenuComponent } from '../../componentes/menu/menu.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [MenuComponent, TextoComponent, CarrosselComponent,FooterComponent,FormularioComponent ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

}
