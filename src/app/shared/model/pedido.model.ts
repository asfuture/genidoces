export interface PedidoModel {
    _id:number;
    nome:string;
    telefone:number;
    endereco:string;
    mensagem:string;
}

export interface CardDoces {
    _id:number;
    titulo:string;
    descricao:string;
    link:string;
    whatsapp:string;
    imagem:string;
}

export interface user {
    _id?:string;
    email:string;
    senha:string;
}
