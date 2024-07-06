import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { CardDoces } from '../model/pedido.model';
import { Observable, tap, BehaviorSubject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly apiUrl:string = environment.apiUrl;
  private messageSubject = new BehaviorSubject<string | null >(null);
  message$ = this.messageSubject.asObservable();

  showMessage(message:string){
    this.messageSubject.next(message);
    setTimeout(() => this.messageSubject.next(null),3000)
  }
  
  constructor(private http: HttpClient) { }

  get(){
    const listaCard = this.http.get<CardDoces[]>(`${this.apiUrl}/cards`)
    .pipe(
      catchError((error) => {
        this.showMessage(`Erro ao obter lista da de card: ${error.message || error}`);
        return of(null)
      })
    );
    return listaCard;
  }

  post(card:CardDoces):Observable<CardDoces> {
    return this.http.post<CardDoces>(`${this.apiUrl}/cards`, card).pipe(
      tap(() => {
        this.showMessage('Pedido enviado com sucesso');
      }),
      catchError((error) => {
        this.showMessage(`Erro ao enviar pedido: ${error.message || error}`);
        return of(error);
      })
    );
  }

  update(card:CardDoces):Observable<CardDoces> {
    return this.http.put<CardDoces>(`${this.apiUrl}/${card._id}`, card).pipe(
      tap(() => this.showMessage("Card atualizado com sucesso!")),
      catchError((error) => {
        this.showMessage(`Erro ao card pedido; ${error.message || error}`);
        return of(error);
      })
    );
  }
  
  patch(id:string, changes:Partial<CardDoces>):Observable<CardDoces> {
    return this.http.patch<CardDoces>(`${this.apiUrl}/${id}`, changes).pipe(
      tap(() => this.showMessage("Card atualizado com sucesso!")),
      catchError((error) => {
        this.showMessage(`Erro ao atualizar card; ${error.message || error}`);
        return of(error);
      })
    );
  }

  delete(id:string):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.showMessage("Card deletado com sucesso!")),
      catchError((error) => {
        this.showMessage(`Erro ao deletar card; ${error.message || error}`);
        return of(error);
      })
    )
  }

}
