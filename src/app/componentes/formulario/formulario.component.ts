import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective,  } from 'ngx-mask';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective,],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  
  constructor (private formBuilder:FormBuilder){}

  pedido = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.maxLength(50)]],
    telefone: ['', [Validators.required, Validators.maxLength(15)]],
    endereco: ['', Validators.required], 
    mensagem: ['', [Validators.required, Validators.maxLength(500)]],
 });
 
 onSubmit(){
  if(!this.pedido.valid){
    console.log("Formulário inválido");
    return;
  }
  console.log(this.pedido.value);
 }

//  get nome(){
//   return this.pedido.get('nome')!;
//  }
}

