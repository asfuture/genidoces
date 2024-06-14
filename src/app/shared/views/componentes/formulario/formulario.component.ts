import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgxMaskDirective,  } from 'ngx-mask';
import { FormularioService } from './../../../services/formulario.service';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,  NgxMaskDirective],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  providers:[HttpClient]
})
export class FormularioComponent implements OnInit {
  pedido: any = FormGroup;
  lista:any;
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
 
 onSubmit(){
  if(this.pedido.valid){
    const valorPedido = this.pedido.value;
    this.formularioService.postPedido(valorPedido).subscribe(resultado => {
      console.log(resultado);
    }, error =>{
      console.log('Erro ao fazer pedido', error)
    });
  }
  console.log(this.pedido.value);
  this.pedido.reset();
 }

 get nome() {
   return this.pedido.get('nome');
  }
  
 buscar() {
   this.formularioService.getPedido().subscribe((responseApi) => {
    this.lista = responseApi;
   });
  
 }
}

