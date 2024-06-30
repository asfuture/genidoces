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
    whatspp:string;
    imagem:string;
}

export interface login {
    email:string;
    senha:string;
}
