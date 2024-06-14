import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';


import { PedidoModel } from './../model/pedido.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postPedido(pedidoModel:PedidoModel):Observable<PedidoModel>{
      return this.http.post<PedidoModel>(`${this.apiUrl}/pedido`,pedidoModel);
  }

  getPedido(){
    let lista = this.http.get(`${this.apiUrl}/pedido`,);
    return lista;
  }
}
