import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CardService } from '../../../services/card.service';
import { Subject, takeUntil } from 'rxjs';
import { CardDoces } from '../../../model/pedido.model';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Storage, deleteObject, ref, } from '@angular/fire/storage';

@Component({
  selector: 'app-sessao-doces',
  standalone: true,
  imports: [CommonModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './sessao-doces.component.html',
  styleUrl: './sessao-doces.component.css',
  providers:[HttpClient]
})
export class SessaoDocesComponent implements OnInit, OnDestroy {
  card:CardDoces[] | null = [];
  administrador:string = '';
  editarCard!:FormGroup;
  
  private unsubscribe = new Subject<void>();

  constructor (
    public cardService:CardService,
    private router:Router,
    private storage: Storage){}

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

deleteCard(id:string):void {
console.log("valor", id)
    this.cardService.delete(id).pipe(
      takeUntil(this.unsubscribe))
      .subscribe({
        next: (response:any ) => {
            //console.log(" deletado 1", response.deleteCard?.imagem);
             this.deleteImgFirebase(response.deleteCard.imagem);
             this.get();
        }, 
        error:(error) => {
        console.log('Erro ao fazer requisição dos cards',error, )
        }
      })
}

async deleteImgFirebase(filePath:string) {
  try {
    const storageRef = ref(this.storage, filePath);
    await deleteObject(storageRef);
    console.log(`Arquivo ${filePath} removido com sucesso.`);
  } catch (error) {
    console.error("Erro ao remover o arquivo:", error);
  }

}
   ngOnDestroy(): void {
    console.log('O componente está sendo destruído!')
      this.unsubscribe.next();
      this.unsubscribe.complete();
  }

}
