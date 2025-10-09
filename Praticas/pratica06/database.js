// Importa a classe MongoClient do pacote 'mongodb'
import { MongoClient } from "mongodb";

// URL de conexão com o MongoDB Atlas (substitua pela sua URL real)
const url = "mongodb+srv://usrTarefas:abcd1234@cluster0.7uky7ao.mongodb.net/";

// Cria uma instância do cliente MongoDB usando a URL de conexão
const client = new MongoClient(url);

// Função assíncrona para conectar ao banco de dados
export async function conectarDb() {
  try {
    await client.connect();
    console.log("✅ Conectado ao MongoDB com sucesso!");
    return client.db("agenda");
  } catch (erro) {
    console.error("❌ Erro ao conectar ao MongoDB:", erro);
  }
}
