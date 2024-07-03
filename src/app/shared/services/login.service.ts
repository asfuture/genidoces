import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { login } from '../model/pedido.model';
import { tap, Observable, catchError, of, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
        const login = this.http.get<login[]>(`${this.apiUrl}/login`,)
        .pipe(
          tap(() => {
            this.showMessage("lista de pedidos obtida com sucesso!")
          }),
          catchError((error) => {
            this.showMessage(`Erro ao obter listda de pedidos: ${error.message || error}`);
            return of(null)
          })
      );
        return login;
      }

      post(cadastrarLogin:login):Observable<login> {
        return this.http.post<login>(`${this.apiUrl}/login`, cadastrarLogin).pipe(
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

