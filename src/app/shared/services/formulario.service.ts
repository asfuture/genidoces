import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


import { PedidoModel } from './../model/pedido.model';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private readonly apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postPedido(pedidoModel:PedidoModel):Observable<PedidoModel>{
      return this.http.post<PedidoModel>(`${this.apiUrl}/pedido`,pedidoModel);
  }
  getPedido(){
    let lista = this.http.get<PedidoModel[]>(`${this.apiUrl}/pedido`,)
    .pipe(
      //delay(2000),
      tap(console.log)
    );
    return lista;
  }
}
