import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  pedido = this.formBuilder.group({
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    endereco: ['', Validators.required], 
    mensagem: ['', Validators.required],
 });
 
 constructor (private formBuilder:FormBuilder){}

 onSubmit(){
  console.log(this.pedido.value);
 }
}

