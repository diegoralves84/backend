const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const tarefaRouter = require('./routes/tarefaRouter'); 

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/tarefas', tarefaRouter);

module.exports = app;
