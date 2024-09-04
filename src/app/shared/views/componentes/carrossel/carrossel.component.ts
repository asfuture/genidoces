import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var M:any;
@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent implements OnInit {

  constructor( private route:Router){}

  ngOnInit(): void {
    // Validação para ativa o carrossel apenas com a url home
    let valor = this.route.config[1].path;
    if(valor == 'home'){
      var elems = document.querySelectorAll('.carousel');
      var instances = M.Carousel.init(elems);
      //console.log(" IF valor ", valor)
    }
  }
}
