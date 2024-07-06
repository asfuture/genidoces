import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


import { PedidoModel } from './../model/pedido.model';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private readonly apiUrl:string = environment.apiUrl;

  private messageSubject = new BehaviorSubject<string | null >(null);
  message$ = this.messageSubject.asObservable();

  showMessage(message:string){
    this.messageSubject.next(message);
    setTimeout(() => this.messageSubject.next(null),3000)
  }

  constructor(private http: HttpClient) {}

  get(){
    const lista = this.http.get<PedidoModel[]>(`${this.apiUrl}/pedidos`,)
    .pipe(
      tap(() => {
        this.showMessage("lista de pedidos obtida com sucesso!")
      }),
      catchError((error) => {
        this.showMessage(`Erro ao obter listda de pedidos: ${error.message || error}`);
        return of(null)
      })
  );
    return lista;
  }
  
  post(pedido:PedidoModel):Observable<PedidoModel> {
    return this.http.post<PedidoModel>(`${this.apiUrl}/pedidos`, pedido).pipe(
      tap(() => {
        this.showMessage('Pedido enviado com sucesso');
      }),
      catchError((error) => {
        this.showMessage(`Erro ao enviar pedido: ${error.message || error}`);
        return of(error);
      })
    );
  }

  update(pedido:PedidoModel):Observable<PedidoModel> {
    return this.http.put<PedidoModel>(`${this.apiUrl}/${pedido._id}`, pedido).pipe(
      tap(() => this.showMessage("Pedido atualizado com sucesso!")),
      catchError((error) => {
        this.showMessage(`Erro ao atualizar pedido; ${error.message || error}`);
        return of(error);
      })
    );
  }
  
  patch(id:string, changes:Partial<PedidoModel>):Observable<PedidoModel> {
    return this.http.patch<PedidoModel>(`${this.apiUrl}/${id}`, changes).pipe(
      tap(() => this.showMessage("Valor atualizado com sucesso!")),
      catchError((error) => {
        this.showMessage(`Erro ao atualizar valor; ${error.message || error}`);
        return of(error);
      })
    );
  }

  delete(id:string):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.showMessage("Pedido deletado com sucesso!")),
      catchError((error) => {
        this.showMessage(`Erro ao deletar pedido; ${error.message || error}`);
        return of(error);
      })
    )
  }

}
