import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { FormularioService } from '../../../services/formulario.service';
import { Subject, takeUntil } from 'rxjs';
import { PedidoModel } from '../../../model/pedido.model';



@Component({
  selector: 'app-lista-pedido',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './lista-pedido.component.html',
  styleUrl: './lista-pedido.component.css',
  providers:[HttpClient]
})
export class ListaPedidoComponent implements OnInit, OnDestroy {
  pedido:PedidoModel[] | null = [];
  private unsubscribe = new Subject<void>();

  constructor (public formularioService:FormularioService){}

 ngOnInit(): void {
  this.get();
 }

 get() {
       this.formularioService.get().pipe(
        takeUntil(this.unsubscribe))
        .subscribe({
          next: (response:PedidoModel[] | null ) => {
              this.pedido = response;
          }, 
          error:(error) => {
          console.log('Erro ao fazer requisição dos cards',error, )
          }
        })
     }

     ngOnDestroy(): void {
      console.log('O componente está sendo destruído!')
       this.unsubscribe.next();
       this.unsubscribe.complete();
    }
}
