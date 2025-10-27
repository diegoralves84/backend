const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let server;
let produtoId;

beforeAll((done) => {
  server = app.listen(0, done);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('API /produtos', () => {

  it('POST /produtos - sucesso', async () => {
    const res = await request(server)
      .post('/produtos')
      .send({ nome: 'Laranja', preco: 10.0 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.nome).toBe('Laranja');
    expect(res.body.preco).toBe(10.0);

    produtoId = res.body._id;
  });

  it('POST /produtos - erro 422', async () => {
    const res = await request(server)
      .post('/produtos')
      .send({});

    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  it('GET /produtos - retorna lista', async () => {
    const res = await request(server).get('/produtos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /produtos/:id - sucesso', async () => {
    const res = await request(server).get(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body.nome).toBe('Laranja');
    expect(res.body.preco).toBe(10.0);
  });

  it('GET /produtos/0 - erro 400', async () => {
    const res = await request(server).get('/produtos/0');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  it('GET /produtos/:id - erro 404', async () => {
    const res = await request(server).get('/produtos/000000000000000000000000');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  it('PUT /produtos/:id - sucesso', async () => {
    const res = await request(server)
      .put(`/produtos/${produtoId}`)
      .send({ nome: 'Laranja Pera', preco: 18.0 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body.nome).toBe('Laranja Pera');
    expect(res.body.preco).toBe(18.0);
  });

  it('PUT /produtos/:id - erro 422', async () => {
    const res = await request(server)
      .put(`/produtos/${produtoId}`)
      .send({});

    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  it('PUT /produtos/0 - erro 400', async () => {
    const res = await request(server)
      .put('/produtos/0')
      .send({ nome: 'Teste', preco: 1 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  it('PUT /produtos/:id - erro 404', async () => {
    const res = await request(server)
      .put('/produtos/000000000000000000000000')
      .send({ nome: 'Teste', preco: 1 });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  it('DELETE /produtos/:id - sucesso', async () => {
    const res = await request(server).delete(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(204);
  });

  it('DELETE /produtos/0 - erro 400', async () => {
    const res = await request(server).delete('/produtos/0');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  it('DELETE /produtos/:id - erro 404', async () => {
    const res = await request(server).delete(`/produtos/${produtoId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

});
