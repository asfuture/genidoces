import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { CarrosselComponent } from '../../componentes/carrossel/carrossel.component';
import { TextoComponent } from '../../componentes/texto/texto.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [ TextoComponent, CarrosselComponent,FooterComponent, HeaderComponent ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

}
