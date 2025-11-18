const usuariosRouter = require("./routes/usuariosRouter");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const apidocsRouter = require("./routes/apidocsRouter");

const app = express();

app.use(express.json());

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_DATABASE
} = process.env;

mongoose
  .connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

app.use("/api-docs", apidocsRouter);


app.use("/usuarios", usuariosRouter);

module.exports = app;
