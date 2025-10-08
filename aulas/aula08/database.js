// Objeto cliente do mongodb
const { MongoClient } = require("mongodb");

// String de conexão
const url = "mongodb+srv://usrTarefas:abcd1234@cluster0.7uky7ao.mongodb.net/";

const client = new MongoClient(url);


async function conecta() {
    try {
        await client.connect();
        return client.db("agenda");
    } catch (e) {
        console.log(
            "Erro ao conectar no MongoDB!",
            e.message
        );
    }
}

module.exports = conecta;