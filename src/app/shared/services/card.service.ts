import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { CardDoces } from '../model/pedido.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private readonly apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCard(){
    let listaCard = this.http.get<CardDoces[]>(`${this.apiUrl}/card`,)
    .pipe(
      //tap(console.log)
    );
    return listaCard;
  }
}
