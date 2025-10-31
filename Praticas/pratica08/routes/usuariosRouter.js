const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/login", (req, res) => {
  const { usuario, senha } = req.body;


  if (usuario === "email@exemplo.com" && senha === "abcd1234") {
    const token = authMiddleware.gerarToken({ email: usuario });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ msg: "Credenciais inválidas" });
});


router.post("/renovar", authMiddleware.verificarToken, (req, res) => {
  const token = authMiddleware.gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token });
});


module.exports = router;
