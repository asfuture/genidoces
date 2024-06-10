import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sessao-doces',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sessao-doces.component.html',
  styleUrl: './sessao-doces.component.css'
})
export class SessaoDocesComponent {
 card = [
      {
        titulo: 'Birgadeiro de Chocolate 1',
        descricao:'Para os dia dos Namorados presentei a sua amada com um brigadeiro do amor.',
        link:"Faça seu pedido agora!",
        whatspp:'https://wa.me/11995421492',
        imagem: '../../../assets/brigadeiro.jpg'
      },
      {
        titulo: 'Birgadeiro de Chocolate 2',
        descricao:'Para os dia dos Namorados presentei a sua amada com um brigadeiro do amor.',
        link:"Faça seu pedido agora!",
        whatspp:'https://wa.me/11995421492',
        imagem: '../../../assets/brigadeiro1.jpg'
      },
      {
        titulo: 'Birgadeiro de Chocolate 3',
        descricao:'Para os dia dos Namorados presentei a sua amada com um brigadeiro do amor.',
        link:"Faça seu pedido agora!",
        whatspp:'https://wa.me/11995421492',
        imagem: '../../../assets/brigadeiro2.jpg'
      },
      {
        titulo: 'Birgadeiro de Chocolate 4',
        descricao:'Para os dia dos Namorados presentei a sua amada com um brigadeiro do amor.',
        link:"Faça seu pedido agora!",
        whatspp:'https://wa.me/11995421492',
        imagem: '../../../assets/brigadeiro.jpg'
      },
      {
        titulo: 'Birgadeiro de Chocolate 5',
        descricao:'Para os dia dos Namorados presentei a sua amada com um brigadeiro do amor.',
        link:"Faça seu pedido agora!",
        whatspp:'https://wa.me/11995421492',
        imagem: '../../../assets/brigadeiro1.jpg'
      },
      {
        titulo: 'Birgadeiro de Chocolate 6',
        descricao:'Para os dia dos Namorados presentei a sua amada com um brigadeiro do amor.',
        link:"Faça seu pedido agora!",
        whatspp:'https://wa.me/11995421492',
        imagem: '../../../assets/brigadeiro2.jpg'
      },
      {
        titulo: 'Birgadeiro de Chocolate 7',
        descricao:'Para os dia dos Namorados presentei a sua amada com um brigadeiro do amor.',
        link:"Faça seu pedido agora!",
        whatspp:'https://wa.me/11995421492',
        imagem: '../../../assets/brigadeiro.jpg'
      },
      {
        titulo: 'Birgadeiro de Chocolate 8',
        descricao:'Para os dia dos Namorados presentei a sua amada com um brigadeiro do amor.',
        link:"Faça seu pedido agora!",
        whatspp:'https://wa.me/11995421492',
        imagem: '../../../assets/brigadeiro1.jpg'
      }
      
 ];
}
