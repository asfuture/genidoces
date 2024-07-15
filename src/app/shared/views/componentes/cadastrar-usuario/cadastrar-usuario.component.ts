import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
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
    private cryptoService:CryptoService,
    private route:Router
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
             for ( const item of response! ) {
              const emailDecreptado =  this.cryptoService.decryptData(item.email);
              const senhaDecreptado  = this.cryptoService.decryptData(item.senha);
              
              this.user.push({ email:emailDecreptado, senha:senhaDecreptado,_id:item._id});
             }
             this.user.reverse();
         }, 
         error:(error) => {
         console.log('Erro ao fazer requisição dos cards',error, )
         }
       });
    }
  }

  onSubmit():void {
    if(this.cadastrarUsuario.valid) {
      console.log("lista comparar",this.user) ;

      // for (let item of this.user){
          
      //   console.log('use', item.email," igual ", this.cadastrarUsuario.value.email )
      // }
        
      
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
             });
      this.cadastrarUsuario.reset();
   }
 }

 deletar (id:string):void {
  const resposta = confirm("Deseja realmente deletar esse usuário?",);
  if (resposta) {
      alert(`Item deletado com sucesso, ${id}`);
      this.userService.delete(id).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe({
        next: () => console.log("Usuário deletado com sucesso."),
        error: err => console.error('Erro ao deletar usuário: ', err)
      });
  }
 }

 removeAspas(str: string): string {
  return str.replace(/^"|"$/g, '');
  }

}
