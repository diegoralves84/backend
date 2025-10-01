// Array simulado de tarefas
const tarefas = [];

// Lista todas as tarefas
function listar() {
  return tarefas;
}

// Busca tarefa pelo ID
function buscarPeloId(tarefaId) {
  const tarefa = tarefas.find(t => t.id === tarefaId);
  return tarefa || null;
}

// Cria nova tarefa
function criar(tarefa) {
  const novaTarefa = {
    id: Math.random().toString(36).substr(2, 4), // ID aleatório
    ...tarefa
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

// Atualiza tarefa existente
function atualizar(tarefa) {
  const index = tarefas.findIndex(t => t.id === tarefa.id);
  if (index === -1) return null;

  tarefas[index] = { ...tarefas[index], ...tarefa };
  return tarefas[index];
}

// Remove tarefa
function remover(tarefaId) {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index === -1) return null;

  const tarefaRemovida = tarefas.splice(index, 1)[0];
  return tarefaRemovida;
}

// Exporta todas as funções
module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover
};
