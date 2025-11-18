const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let usuarioCriadoEmail = "usuario@email.com";
let usuarioId = null;
let token = null;

describe("Testes completos da API /usuarios", () => {

  test("POST /usuarios deve criar usuário e retornar 201 + JSON", async () => {
    const response = await request
      .post("/usuarios")
      .send({
        email: usuarioCriadoEmail,
        senha: "abcd1234"
      })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("email", usuarioCriadoEmail);

    usuarioId = response.body._id;
  });

  test("POST /usuarios sem body deve retornar 422 + msg", async () => {
    const response = await request
      .post("/usuarios")
      .send({})
      .expect("Content-Type", /json/)
      .expect(422);

    expect(response.body).toHaveProperty("msg", "Email e Senha são obrigatórios");
  });

  test("POST /usuarios/login deve retornar 200 + token", async () => {
    const response = await request
      .post("/usuarios/login")
      .send({
        usuario: usuarioCriadoEmail,
        senha: "abcd1234"
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("token");

    token = response.body.token;
  });

  test("POST /usuarios/login sem body deve retornar 401 + msg", async () => {
    const response = await request
      .post("/usuarios/login")
      .send({})
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toHaveProperty("msg", "Credenciais inválidas");
  });

  test("POST /usuarios/renovar com token correto deve retornar 200 + token", async () => {
    const response = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("token");
  });

  test("POST /usuarios/renovar com token inválido deve retornar 401 + msg", async () => {
    const response = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toHaveProperty("msg", "Token inválido");
  });

  test("DELETE /usuarios deve retornar 204 sem conteúdo", async () => {
    await request
      .delete(`/usuarios`)
      .set("authorization", `Bearer ${token}`)
      .send({ usuario: usuarioCriadoEmail })
      .expect(204);
  });
});
