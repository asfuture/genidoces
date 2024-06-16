import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgxMaskDirective,  } from 'ngx-mask';
import { FormularioService } from './../../../services/formulario.service';

import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,  NgxMaskDirective],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  providers:[HttpClient]
})
export class FormularioComponent implements OnInit, OnDestroy {
  pedido: any = FormGroup;
  //lista!:PedidoModel[];
  //lista$!: Observable<PedidoModel[]>;
  private unsubscribe = new Subject<void>();

  constructor (
    private formBuilder:FormBuilder,
    private formularioService:FormularioService
  ){}

  ngOnInit(): void {
    this.pedido = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      telefone: ['', [Validators.required, Validators.maxLength(15)]],
      endereco: ['', Validators.required], 
      mensagem: ['', [Validators.required, Validators.maxLength(500)]],
   });
  }
 
 onSubmit() {
  if(this.pedido.valid) {
      const valorPedido = this.pedido.value;
      this.formularioService.postPedido(valorPedido).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe({
        next: (resultado) => {
          console.log(resultado);
          alert('Pedido feito com sucesso!')
      }, 
      error:(error) => {
        console.log('Erro ao fazer pedido', error)
       }
     });
    }
    console.log(this.pedido.value);
    this.pedido.reset();
 }

 ngOnDestroy(): void {
  console.log('O componente está sendo destruído!')
   this.unsubscribe.next();
   this.unsubscribe.complete();
  }

}

