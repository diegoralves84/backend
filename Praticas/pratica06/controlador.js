import { Tarefa } from "./modelo.js";

export async function adicionarTarefa(nome) {
  // Cria uma instância de Tarefa
  const tarefa = new Tarefa(nome, false);
  // Insere no banco de dados
  await tarefa.inserir();

  console.log(`Tarefa "${nome}" adicionada com sucesso!`);
}

// Busca uma tarefa pelo nome
export async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome, false);

  // Retorna o resultado da busca
  await tarefa.buscar();

  if (tarefa.id) {
    console.log("Tarefa encontrada:", tarefa);
    return tarefa;
  } else {
    console.log(`Tarefa "${nome}" não encontrada.`);
    return null;
  }
}

// Atualiza uma tarefa existente
export async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome, false);

  // Busca a tarefa no banco
  await tarefa.buscar();

  if (tarefa.id) {
    // Atualiza as propriedades
    tarefa.nome = nome;
    tarefa.concluida = concluida;

    // Aplica a alteração no banco
    await tarefa.alterar();

    console.log(`Tarefa "${nome}" atualizada para concluída = ${concluida}`);
  } else {
    console.log(`Tarefa "${nome}" não encontrada para atualização.`);
  }
}

// Função para remover uma tarefa existente
export async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome, false);

  // Busca a tarefa antes de deletar
  await tarefa.buscar();

  if (tarefa.id) {
    await tarefa.deletar();
    console.log(`Tarefa "${nome}" removida com sucesso!`);
  } else {
    console.log(`Tarefa "${nome}" não encontrada para exclusão.`);
  }
}
