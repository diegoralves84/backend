// Importa o pacote readline-sync para interação via terminal
import readline from "readline-sync";

// Importa todas as funções do controlador
import * as controlador from "./controlador.js";

// Importa a classe Tarefa para inicializar o banco
import { Tarefa } from "./modelo.js";

// Função para exibir o menu principal
function menu() {
  console.log("\n===== MENU PRINCIPAL =====");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
  console.log("===========================");
}

// Função que executa a ação conforme a opção escolhida
async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1":
      // Adicionar tarefa
      const nomeAdicionar = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdicionar);
      break;

    case "2":
      // Buscar tarefa
      const nomeBuscar = readline.question("Digite o nome da tarefa: ");
      const tarefaEncontrada = await controlador.buscarTarefa(nomeBuscar);
      if (tarefaEncontrada) {
        console.log("\n--- Dados da tarefa ---");
        console.log(`ID: ${tarefaEncontrada.id}`);
        console.log(`Nome: ${tarefaEncontrada.nome}`);
        console.log(`Concluída: ${tarefaEncontrada.concluida}`);
      }
      break;

    case "3":
      // Atualizar tarefa
      const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
      const concluidaStr = readline.question("A tarefa está concluída? (s/n): ");
      const concluida = concluidaStr.toLowerCase() === "s";
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      break;

    case "4":
      // Remover tarefa
      const nomeRemover = readline.question("Digite o nome da tarefa: ");
      await controlador.removerTarefa(nomeRemover);
      break;

    case "5":
      console.log("Encerrando o programa...");
      process.exit(0);
      break;

    default:
      console.log("Opção inválida! Tente novamente.");
  }
}

// Função principal
async function main() {
  // Inicializa o acesso ao banco
  await Tarefa.inicializar();

  // Loop infinito do menu
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opcao: ");
    await escolherOpcao(opcao);
  }
}

// Executa o programa
main();
