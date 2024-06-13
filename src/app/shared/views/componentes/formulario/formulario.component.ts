import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective,  } from 'ngx-mask';
import { PedidoModel } from '../../../model/pedido.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective,],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  pedido:any = FormGroup;
  constructor (private formBuilder:FormBuilder){}


  ngOnInit(): void {
    this.pedido = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      telefone: ['', [Validators.required, Validators.maxLength(15)]],
      endereco: ['', Validators.required], 
      mensagem: ['', [Validators.required, Validators.maxLength(500)]],
   });
  }
 
 onSubmit(){
  console.log(this.pedido.value);
  this.pedido.reset();
 }

 get nome(){
   return this.pedido.get('nome');
  }

}

