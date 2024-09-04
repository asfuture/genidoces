import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { user } from '../../../model/pedido.model';
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
export class LoginComponent implements OnInit, OnDestroy {
  login:any = FormGroup;
  loginUsuario:any = '';
  
  private unsubscribe = new Subject<void>();

  constructor( 
    private formBuilder:FormBuilder,
    private userService:UserService,
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
     this.getLoginUsuario();
   }
 }
 
 getLoginUsuario() {
  this.userService.get().pipe(
    takeUntil(this.unsubscribe))
    .subscribe({
      next: (response:user[] | null ) => {
        this.loginUsuario = response;
        //Chama validação de mail e senha
        this.validarEmail()
      }, 
      error:(error) => {
      console.log('Erro ao fazer requisição dos usuários',error, )
      }
    })
 }

 // validação de email
   validarEmail() {
    var valor = 0;
     for (const usuario of this.loginUsuario) {
       if (this.cryptoService.decryptData(usuario.email) === this.login.value.email && this.cryptoService.decryptData(usuario.senha) === this.login.value.senha ){
            sessionStorage.setItem('isAuthenticated','true')
            this.router.navigate(['administrador']);
           valor = 1;
           break;
       } 
     }

     if(valor == 0){
      alert("Verifique o seu Email e Senha! Por Favor!");
     }
   }

   ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
