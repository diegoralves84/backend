import { conectarDb } from "./database.js";

export class Tarefa {
  static db;
  static collection;

  static async inicializar() {
    this.db = await conectarDb();
    this.collection = this.db.collection("tarefas");
  }

  constructor(nome, concluida) {
    this.id = null; 
    this.nome = nome;
    this.concluida = concluida;
  }

  async inserir() {
    const resultado = await Tarefa.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });

    // Guarda o ID gerado na propriedade id
    this.id = resultado.insertedId;
  }

  // Altera uma tarefa existente
  async alterar() {
    await Tarefa.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
  }

  // Deleta uma tarefa pelo nome
  async deletar() {
    await Tarefa.collection.deleteOne({ nome: this.nome });
  }

  // Busca uma tarefa pelo nome
  async buscar() {
    const resultado = await Tarefa.collection.findOne({ nome: this.nome });

    if (resultado) {
      //Atualiza as propriedades com os valores do banco
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
    }
  }
}
