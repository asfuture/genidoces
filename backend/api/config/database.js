const mongoose = require('mongoose');

const dbURI = `mongodb+srv://asfuture:Aiesec2014@genidoces.mqztirw.mongodb.net/genidoces?retryWrites=true&w=majority&appName=genidoces`;

mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error:', error));

const db = mongoose.connection;

module.exports = db;
