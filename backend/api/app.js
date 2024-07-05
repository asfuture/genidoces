const express = require('express');
const app = express();
const pedidoRoutes = require('./routes/pedidoRoutes');
const cardRoutes = require('./routes/cardRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/database');

app.use(express.json());
app.use('/pedidos', pedidoRoutes);
app.use('/cards', cardRoutes);
app.use('/user', userRoutes);

module.exports = app;
