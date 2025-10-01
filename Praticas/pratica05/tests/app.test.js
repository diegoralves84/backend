const request = require('supertest');
const app = require('../app');

let tarefaId; // Variável para armazenar o ID da tarefa criada

describe('Testes da API /tarefas', () => {

  // Teste GET 
  test('GET /tarefas deve retornar 200 e JSON', async () => {
    const response = await request(app).get('/tarefas');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Teste POST 
  test('POST /tarefas deve criar uma nova tarefa', async () => {
    const novaTarefa = { nome: 'Estudar Node', concluida: false };
    const response = await request(app)
      .post('/tarefas')
      .send(novaTarefa);
    
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.nome).toBe(novaTarefa.nome);

    // Salva o ID da tarefa criada para usar nos próximos testes
    tarefaId = response.body.id;
  });

  // Teste GET 
  test('GET /tarefas/:id deve retornar 200 e JSON', async () => {
    const response = await request(app).get(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBe(tarefaId);
  });

  // Teste GET /tarefas/1 (não existe)
  test('GET /tarefas/999 deve retornar 404 e JSON', async () => {
    const response = await request(app).get('/tarefas/999');
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  // Teste PUT /tarefas/:id
  test('PUT /tarefas/:id deve atualizar a tarefa', async () => {
    const tarefaAtualizada = { nome: 'Estudar Node e Express', concluida: true };
    const response = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send(tarefaAtualizada);
    
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.nome).toBe(tarefaAtualizada.nome);
    expect(response.body.concluida).toBe(true);
  });

  // Teste PUT /tarefas/1 (não existe)
  test('PUT /tarefas/999 deve retornar 404 e JSON', async () => {
    const response = await request(app)
      .put('/tarefas/999')
      .send({ nome: 'Teste', concluida: true });
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  // Teste DELETE /tarefas/:id
  test('DELETE /tarefas/:id deve retornar 204 sem conteúdo', async () => {
    const response = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  // Teste DELETE /tarefas/1 (não existe)
  test('DELETE /tarefas/999 deve retornar 404 e JSON', async () => {
    const response = await request(app).delete('/tarefas/999');
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });

});
