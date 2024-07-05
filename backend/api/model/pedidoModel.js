const mongoose = require('mongoose');

const pedidoShema = new mongoose.Schema({
    nome: {type:String, require:true},
    telefone: {type:String, require:true},
    endereco: {type:String, require:true},
    mensagem: {type:String, require:true}
});

module.exports = mongoose.model('Pedido', pedidoShema);
