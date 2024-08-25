import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CardService } from '../../../services/card.service';
import { Subject, takeUntil } from 'rxjs';
import { CardDoces } from '../../../model/pedido.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sessao-doces',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './sessao-doces.component.html',
  styleUrl: './sessao-doces.component.css',
  providers:[HttpClient]
})
export class SessaoDocesComponent implements OnInit, OnDestroy {
  card:CardDoces[] | null = [];
  administrador:string = '';
  
  private unsubscribe = new Subject<void>();

  constructor (
    public cardService:CardService,
    private router:Router){}

 ngOnInit(): void {
  this.administrador = this.router.url;
  this.get();
 }

 get() {
       this.cardService.get().pipe(
        takeUntil(this.unsubscribe))
        .subscribe({
          next: (response:CardDoces[] | null ) => {
              this.card = response;
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
