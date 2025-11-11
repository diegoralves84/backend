const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const apidocsRouter = require('./routes/apidocsRouter');

app.use('/api-docs', apidocsRouter);

module.exports = app;
