const Card = require('../model/cardModel');

exports.getCard = async (req, res) => {
    try {
        const card = await Card.find();
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCardById =  async (req, res) => {
    try {
        const cardId = await Card.findById(req.params.id);
        if(!card) return res.status(404).json({message: ' Card not found'});
        res.status(200).json(pedidoId);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCard = async (req, res) => {
    const card = new card({
        titulo:req.body.titulo,
        descricao:req.body.descricao,
        whatsapp:req.body.whatsapp,
        imagem:req.body.imagem,
    });

    try {
        const newCard = await Card.save();
        res.status(201).json(newCard);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
};

exports.updateCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if(!card) return res.status(404).json({ message: 'Card not found'});

        if (red.body.titulo != null) card.titulo = req.body.titulo;
        if (red.body.descricao != null) card.descricao = req.body.descricao;
        if (red.body.whatsapp != null) card.whatsapp = req.body.whatsapp;
        if (red.body.mensagem != null) card.mensagem = req.body.mensagem;

        const updatedCard = await card.save();
        res.status(200).json(updatedCard);
    } catch (err) {
       res.status(400).json({ message: err.message});
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: 'Pedido not found' });

        await cardDelete .remove();
        res.status(200).json({ message: 'Card deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



