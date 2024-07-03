import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';
import { login } from '../../../model/pedido.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CryptoService } from '../../../services/crypto.service';
import {  Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lista-card',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule ],
  templateUrl: './lista-card.component.html',
  styleUrl: './lista-card.component.css',
  providers:[HttpClient]
})
export class ListaCardComponent implements OnInit{
  cadastrarLogin:any = FormGroup;
  private unsubscribe = new Subject<void>();

  constructor( 
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private cryptoService:CryptoService
   ){}

   ngOnInit(): void {
    this.cadastrarLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(40)]],
      senha: ['', [Validators.required, Validators.maxLength(4)]],
   });
  }

  onSubmit() {
    if(this.cadastrarLogin.valid) {
         const valor = this.cadastrarLogin.value;
         const email = JSON.stringify(valor.email);
         const senha = JSON.stringify(valor.senha);

         const emailEncryptado = this.cryptoService.encryptData(email);
         const senhaEncryptada  = this.cryptoService.encryptData(senha);
      
            this.loginService.post({email:emailEncryptado, senha:senhaEncryptada} ).pipe(
             takeUntil(this.unsubscribe))
             .subscribe({
              next: (response:login) => {
             
              }, 
               error:(error) => {
               console.log('Erro ao fazer requisição dos cards',error, )
               }
             })
      this.cadastrarLogin.reset();
   }
 
     
 }
}
