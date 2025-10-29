const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

async function criar(req, res) {
  try {
    if (!req.body.nome || req.body.preco === undefined) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }

    const novoProduto = await Produto.create({
      nome: req.body.nome,
      preco: req.body.preco
    });

    res.status(201).json(novoProduto);
  } catch {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  res.status(200).json(produtosCadastrados);
}

async function buscar(req, res, next) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  const produtoEncontrado = await Produto.findOne({ _id: id });

  if (produtoEncontrado) {
    req.produto = produtoEncontrado;
    return next();
  } else {
    return res.status(404).json({ msg: "Produto não encontrado" });
  }
}

function exibir(req, res) {
  res.status(200).json(req.produto);
}

async function atualizar(req, res) {
  const id = req.params.id;

  if (!req.body.nome || req.body.preco === undefined) {
    return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }

  try {
    await Produto.findOneAndUpdate(
      { _id: id },
      { nome: req.body.nome, preco: req.body.preco },
      { new: true, runValidators: true }
    );

    const produtoAtualizado = {
      _id: id,
      nome: req.body.nome,
      preco: req.body.preco
    };

    res.status(200).json(produtoAtualizado);
  } catch {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function remover(req, res) {
  const id = req.params.id;
  await Produto.findOneAndDelete({ _id: id });
  res.status(204).end();
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};
