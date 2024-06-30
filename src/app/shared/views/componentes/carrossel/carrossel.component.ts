import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let M:any;
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
    const valor = this.route.config[1].path;
    if(valor == 'home'){
      const elems = document.querySelectorAll('.carousel');
      M.Carousel.init(elems);
      console.log(" IF valor ", valor)
    }
  }
}
