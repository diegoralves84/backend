const { cifrarSenha, compararSenha, gerarToken } = require("../middlewares/authMiddleware");
const usuariosModel = require("../models/usuariosModel");


async function criar(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }

    const senhaCifrada = cifrarSenha(senha);

    const novoUsuario = await usuariosModel.create({
      email,
      senha: senhaCifrada,
    });

    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email,
    });

  } catch (error) {
    return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
  }
}


async function login(req, res) {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const user = await usuariosModel.findOne({ email: usuario });

    if (!user) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    if (!compararSenha(senha, user.senha)) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const token = gerarToken({ id: user._id, email: user.email });

    return res.status(200).json({ token });

  } catch (err) {
    return res.status(500).json({ msg: "Erro ao realizar login" });
  }
}


async function renovar(req, res) {
  try {
    const { usuario } = req;

    const novoToken = gerarToken({
      id: usuario.id,
      email: usuario.email
    });

    return res.status(200).json({ token: novoToken });

  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}


async function remover(req, res) {
  try {
    await usuariosModel.findOneAndDelete({ email: req.body.usuario });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ msg: "Erro ao remover usuário" });
  }
}

module.exports = {
  criar,
  login,
  renovar,
  remover
};
