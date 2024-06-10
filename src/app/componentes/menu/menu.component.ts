import { Component, EventEmitter, Output, } from '@angular/core';
import { RouterLink } from '@angular/router';
//declare var M:any;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent  {


  constructor(){}

}
