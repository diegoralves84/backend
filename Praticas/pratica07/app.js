require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } = process.env;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log('Conectado ao MongoDB Atlas!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const produtosRouter = require('./routes/produtosRouter');
app.use('/produtos', produtosRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API prática 07 funcionando corretamente' });
});

module.exports = app;
