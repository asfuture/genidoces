import { routes } from './../../app.routes';
import { Component, OnInit} from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { SessaoDocesComponent } from '../../componentes/sessao-doces/sessao-doces.component';
import { CarrosselComponent } from '../../componentes/carrossel/carrossel.component';
import { TextoComponent } from '../../componentes/texto/texto.component';
import { Router } from '@angular/router';
declare var M:any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MenuComponent, FooterComponent, SessaoDocesComponent, CarrosselComponent, TextoComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor( private route:Router){

  }
ngOnInit(): void {
      // Ativa o carrossel do componente Carrossel
      // let valor = this.route.config[1].path;
      // if(valor == 'home'){
      //   var elems = document.querySelectorAll('.carousel');
      //   var instances = M.Carousel.init(elems);
      //   console.log(" IF valor ", valor)
      // }
       
  }

}
