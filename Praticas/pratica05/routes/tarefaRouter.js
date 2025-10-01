const express = require('express');
const router = express.Router();
// Importa todas as funções do controller e renomeia como tarefaController
const tarefaController = require('../controllers/tarefaController');

// Middlewares de rota usando funções do controller//

// GET /tarefas -> listar todas as tarefas
router.get('/', tarefaController.listar);

// GET /tarefas/:tarefaId -> buscar tarefa pelo ID
router.get('/:tarefaId', tarefaController.buscarPeloId);

// POST /tarefas -> criar nova tarefa
router.post('/', tarefaController.criar);

// PUT /tarefas/:tarefaId -> atualizar tarefa
router.put('/:tarefaId', tarefaController.atualizar);

// DELETE /tarefas/:tarefaId -> remover tarefa
router.delete('/:tarefaId', tarefaController.remover);

module.exports = router;
