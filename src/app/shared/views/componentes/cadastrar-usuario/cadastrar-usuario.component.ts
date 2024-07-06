import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { user } from '../../../model/pedido.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CryptoService } from '../../../services/crypto.service';
import {  Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css',
  providers:[HttpClient]
})
export class CadastrarUsuarioComponent implements OnInit {
   user: user[] = [];

  cadastrarUsuario:any = FormGroup;
  private unsubscribe = new Subject<void>();

  constructor( 
    private formBuilder:FormBuilder,
    private userService:UserService,
    private cryptoService:CryptoService
   ){}

   ngOnInit(): void {
    this.cadastrarUsuario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(40)]],
      senha: ['', [Validators.required, Validators.maxLength(4)]],
   });


   if(this.user) {
      this.userService.get().pipe(
       takeUntil(this.unsubscribe))
       .subscribe({
         next: (response:user[] | null ) => {
             const apiEmailSenha = response;
             for ( const item of apiEmailSenha! ) {
              console.log("api",apiEmailSenha)
              const emailDecreptado = this.cryptoService.decryptData(item.email);
              const senhaDecreptado  = this.cryptoService.decryptData(item.senha);
              
              this.user.push({ email:emailDecreptado, senha:senhaDecreptado})

             }
         }, 
         error:(error) => {
         console.log('Erro ao fazer requisição dos cards',error, )
         }
       })
    }
  }

  onSubmit() {
    if(this.cadastrarUsuario.valid) {
         const valor = this.cadastrarUsuario.value;
         const email = JSON.stringify(valor.email);
         const senha = JSON.stringify(valor.senha);

         const emailEncryptado = this.cryptoService.encryptData(email);
         const senhaEncryptada  = this.cryptoService.encryptData(senha);
      
            this.userService.post({email:emailEncryptado, senha:senhaEncryptada} ).pipe(
             takeUntil(this.unsubscribe))
             .subscribe({
              next: (response:user) => {
             
              }, 
               error:(error) => {
               console.log('Erro ao fazer requisição dos cards',error, )
               }
             })
      this.cadastrarUsuario.reset();
   }
 }


}
