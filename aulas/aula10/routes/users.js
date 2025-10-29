const express = require('express');

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
//simula autenticação
  if (username === "diegoralves@iesb.edu.br" && password === "abcd1234") {
    const payload = {
      email: username,
      nome: "Diego"
    };
    try {
      return res.json({token: auth.gerarToken(payload)})
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }

  return res.status(401).json({msg: "Credenciais invalidas"});
});

module.exports = router;
