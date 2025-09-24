const tarefas = [];

// Listar todas as tarefas
const listar = () => {
  return tarefas;
};

// Criar nova tarefa
const criar = (dados) => {
  const novaTarefa = {
    ...dados,
    id: tarefas.length + 1,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

// Obter uma tarefa pelo ID
const obter = (id) => {
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(id, 10));
  return tarefaEncontrada;
};

// Atualizar uma tarefa
const atualizar = (tarefa) => {
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(tarefa.id, 10));
  if (tarefaEncontrada) {
    tarefaEncontrada.nome = tarefa.nome ?? tarefaEncontrada.nome;
    tarefaEncontrada.concluida = tarefa.concluida ?? tarefaEncontrada.concluida;
  }
  return tarefaEncontrada;
};

// Remover uma tarefa
const remover = (id) => {
  const posicao = tarefas.findIndex((item) => item.id === parseInt(id, 10));
  if (posicao >= 0) {
    tarefas.splice(posicao, 1);
    return true;
  }
  return false;
};

module.exports = { listar, criar, obter, atualizar, remover };
