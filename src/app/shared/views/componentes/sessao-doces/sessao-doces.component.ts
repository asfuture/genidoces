import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';

import { CardService } from '../../../services/card.service';
import { Subject, takeUntil } from 'rxjs';
import { CardDoces } from '../../../model/pedido.model';


@Component({
  selector: 'app-sessao-doces',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './sessao-doces.component.html',
  styleUrl: './sessao-doces.component.css',
  providers:[HttpClient]
})
export class SessaoDocesComponent implements OnInit, OnDestroy {
  card:CardDoces[] = [];
  
  private unsubscribe = new Subject<void>();

  constructor (private cardService:CardService){}

 ngOnInit(): void {
  this.getCard();
 }

 getCard() {
       this.cardService.getCard().pipe(
        takeUntil(this.unsubscribe))
        .subscribe({
          next: (response:CardDoces[]  ) => {
              console.log(response);
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
