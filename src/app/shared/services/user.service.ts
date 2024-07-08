import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { user } from '../model/pedido.model';
import { tap, Observable, catchError, of, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private readonly apiUrl:string = environment.apiUrl;

    private messageSubject = new BehaviorSubject<string | null >(null);
    message$ = this.messageSubject.asObservable();
  
    showMessage(message:string){
      this.messageSubject.next(message);
      setTimeout(() => this.messageSubject.next(null),3000)
    }
  
  constructor(
    private http:HttpClient
  ) { }

  get() {
        const user = this.http.get<user[]>(`${this.apiUrl}/user`,)
        .pipe(
          tap(console.log),
          tap(() => {
            this.showMessage("lista de pedidos obtida com sucesso!")
          }),
          catchError((error) => {
            this.showMessage(`Erro ao obter listda de pedidos: ${error.message || error}`);
            return of(null)
          })
      );
        return user;
      }

      post(cadastrarUsuario:user):Observable<user> {
        return this.http.post<user>(`${this.apiUrl}/user`, cadastrarUsuario).pipe(
          tap(() => {
            this.showMessage('Login e senha cadastrado com sucesso');
          }),
          catchError((error) => {
            this.showMessage(`Erro ao cadastrar login e senha: ${error.message || error}`);
            return of(error);
          })
        );
      }

  }

