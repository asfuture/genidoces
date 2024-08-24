import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router,RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { user } from '../../../model/pedido.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CryptoService } from '../../../services/crypto.service';
import {  Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule,RouterModule],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css',
  providers:[HttpClient]
})
export class CadastrarUsuarioComponent implements OnInit, OnDestroy {
  user: user[] = [];
  cadastrarUsuario!: FormGroup;
  atualizarUsuario!: FormGroup;
  editarUsuario:boolean = false;
  atualizarEmail:String='';
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

  // validação de email
  onSubmit():void {
    let valor = 0 ;
    for (const email of this.user) {
      if (email.email === this.cadastrarUsuario.value.email){
          //console.log("Email já cadastrado!")
          valor = 1;
      } 
    }

    if(valor == 0){
      this.criarNovoUsuario()
    } else {
      alert("Esse email já está cadastrado!")
    }
 }

 criarNovoUsuario() {
      if(this.cadastrarUsuario.valid) {
        const valor = this.cadastrarUsuario.value;
        const emailEncryptado = this.cryptoService.encryptData(valor.email);
        const senhaEncryptada = this.cryptoService.encryptData(valor.senha);
           this.userService.post({email:emailEncryptado, senha:senhaEncryptada} ).pipe(
            takeUntil(this.unsubscribe))
            .subscribe({
             next: (response) => {
                this.route.navigate(['/cadastrar']);
             }, 
              error:(error) => {
              console.log('Erro ao fazer requisição dos cards',error, )
              }
            });
         this.cadastrarUsuario.reset();
    }
 }
 
 editar(id:string) {
  this.editarUsuario = true
  for(const valorId of this.user){
        if(id == valorId._id){
          this.atualizarUsuario = this.formBuilder.group({
            id:[id],
            email: [this.removeAspas(valorId.email), [Validators.required, Validators.maxLength(40)]],
            senha: [this.removeAspas(valorId.senha), [Validators.required, Validators.maxLength(4)]],
         });
      }
    }
  }

 atualizar(){
  this.editarUsuario = false
  const emailEncryptado = this.cryptoService.encryptData(this.atualizarUsuario.value.email);
  const senhaEncryptada = this.cryptoService.encryptData(this.atualizarUsuario.value.senha);

  this.userService.update({_id:this.atualizarUsuario.value.id, email:emailEncryptado, senha:senhaEncryptada} ).pipe(
    takeUntil(this.unsubscribe))
    .subscribe({
     next: (response:user) => {}, 
      error:(error) => {
      console.log('Erro ao fazer requisição dos cards',error, )
      }
    });
 }

 close(){
  this.editarUsuario = false
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

   removeAspas(str: string | undefined | null): string {
    if (!str) {
      return ''; // Retorna uma string vazia se 'str' for undefined ou null
    }
    return str.replace(/^"|"$/g, '');
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
  

