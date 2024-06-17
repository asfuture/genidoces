export interface PedidoModel {
    nome:string;
    telefone:string;
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
