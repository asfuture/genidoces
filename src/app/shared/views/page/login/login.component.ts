import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { login } from '../../../model/pedido.model';
import { CryptoService } from '../../../services/crypto.service';
import {  Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[HttpClient]
})
export class LoginComponent implements OnInit {

  login:any = FormGroup;
  private unsubscribe = new Subject<void>();

  constructor( 
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private cryptoService:CryptoService,
    private router:Router
   ){}

ngOnInit(): void {
  this.login = this.formBuilder.group({
    email: ['', [Validators.required, Validators.maxLength(30)]],
    senha: ['', [Validators.required, Validators.maxLength(4)]],
 });
}
  onSubmit() {
   if(this.login.valid) {
        const valor = this.login.value;
        const email = JSON.stringify(valor.email);
        const senha = JSON.stringify(valor.senha);

          this.loginService.get().pipe(
           takeUntil(this.unsubscribe))
           .subscribe({
             next: (response:login[] | null ) => {
                 const apiEmailSenha = response;
                 for ( const item of apiEmailSenha! ) {
                  const emailDecreptado = this.cryptoService.decryptData(item.email);
                  const senhaDecreptado  = this.cryptoService.decryptData(item.senha);
          
                      if (emailDecreptado == email && senhaDecreptado == senha ) {
                          console.log(" Acesso ok!")
                          this.router.navigate(['lista']);
                          break;
                      } else {
                        console.log(" Acesso negado!")
                      }
                 }
             }, 
             error:(error) => {
             console.log('Erro ao fazer requisição dos cards',error, )
             }
           })
     this.login.reset();
   }
 }
}
