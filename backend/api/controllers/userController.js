const user = require('../model/userModel');

exports.getUser = async (req, res) => {
    try {
        const user = await user.find();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await user.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new user({
        email: req.body.email,
        senha: req.body.senha
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await user.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (req.body.email != null) login.email = req.body.email;
        if (req.body.senha != null) login.senha = req.body.senha;

        const updatedLogin = await login.save();
        res.status(200).json(updatedLogin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await user.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.remove();
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
