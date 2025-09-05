// importa o framework 
const express = require("express");

// cria uma instância da aplicação
const app = express();

//MIDDLEWARE DE APLICAÇÃO
app.use((req, res, next) => {
    console.log("Passei aqui, Porra!");
    next();
})

//middleware de rota
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Cheguei aqui, hein?");
});

router.post('/', (req, res) =>{
    res.status(201).send("Inserido, mermão!");
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    if (id == 1) return res.send("Aêee.. Achei, caraio!");
    throw Error("Escondeu bem, não achei!");
})


app.use('/tarefas', router);

// middleware de erro
app.use((err, req, res, next) =>{
    console.log(err.stack);
    res.status(500).send("Errou alguma coisa aí, mané!");
});

// inicia a aplicação
app.listen(3000, ()=>{
console.log("App está ON, caraí!");
});
