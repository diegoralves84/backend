// Importa o modelo
const tarefaModel = require('../models/tarefaModel');

// Lista todas tarefas
function listar(req, res) {
  const resultado = tarefaModel.listar();
  res.json(resultado);
}

// Busca tarefa pelo ID
function buscarPeloId(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.buscarPeloId(tarefaId);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.json(resultado);
}

// Cria nova tarefa
function criar(req, res) {
  const resultado = tarefaModel.criar(req.body);
  res.status(201).json(resultado);
}

// Atualiza tarefa
function atualizar(req, res) {
  const tarefaAtualizada = { id: req.params.tarefaId, ...req.body };
  const resultado = tarefaModel.atualizar(tarefaAtualizada);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.json(resultado);
}

// Remove tarefa
function remover(req, res) {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.remover(tarefaId);

  if (!resultado) {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  res.status(204).send();
}

// Exporta todas as funções do controller
module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};
