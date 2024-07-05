const pedido = require('../model/pedidoModel');

exports.getPedidos = async (req, res) => {
    try {
        const pedidos = await pedido.find();
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPedidoById =  async (req, res) => {
    try {
        const pedidoId = await pedido.findById(req.params.id);
        if(!pedido) return res.status(404).json({message: ' Pedido not found'});
        res.status(200).json(pedidoId);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPedido = async (req, res) => {
    const pedidoC = new pedido({
        nome:req.body.nome,
        telefone:req.body.telefone,
        endereco:req.body.endereco,
        mensagem:req.body.mensagem,
    });

    try {
        const newPedido = await pedidoC.save();
        res.status(201).json(newPedido);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
};

exports.updatePedido = async (req, res) => {
    try {
        const pedidoUp = await pedido.findById(req.params.id);
        if(!pedido) return res.status(404).json({ message: 'Pedido not found'});

        if (red.body.nome != null) pedidoUp.nome = req.body.nome;
        if (red.body.telefone != null) pedidoUp.telefone = req.body.telefone;
        if (red.body.endereco != null) pedidoUp.endereco = req.body.endereco;
        if (red.body.mensagem != null) pedidoUp.mensagem = req.body.mensagem;


        const updatePedido = await pedidoUp.save();
        res.status(200).json(updatePedido);
    } catch (err) {
       res.status(400).json({ message: err.message});
    }
};

exports.deletePedido = async (req, res) => {
    try {
        const pedidoDelete = await pedido.findById(req.params.id);
        if (!pedido) return res.status(404).json({ message: 'Pedido not found' });

        await pedidoDelete .remove();
        res.status(200).json({ message: 'Pedido deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



