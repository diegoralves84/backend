const model = require("../models/tarefaModel");

// Listar todas as tarefas
const listarTarefas = (req, res) => {
  res.json(model.listar());
};

// Criar nova tarefa
const criarTarefa = (req, res) => {
  const novaTarefa = model.criar(req.body);
  res.status(201).json(novaTarefa);
};

const buscarTarefa = (req, res, next) => {
  const {id} = req.params;
  const tarefaEncontrada = model.obter(id);
  if (tarefaEncontrada) 
    return next();
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

// Obter uma tarefa pelo ID
const obterTarefa = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tarefaEncontrada = model.obter(id);
  if (tarefaEncontrada) return res.json(tarefaEncontrada);
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

// Atualizar uma tarefa
const atualizarTarefa = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tarefaAtualizada = model.atualizar({ id, ...req.body });
  if (tarefaAtualizada) {
    return res.json(tarefaAtualizada);
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

// Remover uma tarefa
const removerTarefa = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const removida = model.remover(id);
  if (removida) {
    return res.status(204).end();
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

module.exports = {
  listarTarefas,
  criarTarefa,
  buscarTarefa,
  obterTarefa,
  atualizarTarefa,
  removerTarefa,
};
