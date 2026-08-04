import request from "supertest";
import { app } from "../../app";

describe("API de Produtos", () => {
describe("GET /api/", () => {

    it("deve listar os produtos", async () => {
        const resposta = await request(app)
            .get("/api/");

        expect(resposta.status).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });

});


describe("GET /api/:id", () => {

    it("deve buscar um produto pelo ID", async () => {
        const resposta = await request(app)
            .get("/api/1");

        expect(resposta.status).toBe(200);
        expect(resposta.body).toHaveProperty("id");
    });

    it("deve retornar 404 quando o produto não existe", async () => {
        const resposta = await request(app)
            .get("/api/999999");

        expect(resposta.status).toBe(404);
        expect(resposta.body).toHaveProperty("erro");
    });

});


describe("POST /api/produtos", () => {

    it("deve criar um produto", async () => {
        const resposta = await request(app)
            .post("/api/produtos")
            .send({
                nome: "Pokémon Diamond",
                preco: 200,
                lancamento: 2006,
                plataforma: "Nintendo DS",
                avaliacao: 4,
                foto: "foto"
            });

        expect(resposta.status).toBe(201);
        expect(resposta.body).toHaveProperty("id");
        expect(resposta.body.nome).toBe("Pokémon Diamond");
        expect(resposta.body.preco).toBe(200);
    });

    it("deve retornar 400 quando ocorrer erro ao criar produto", async () => {
        const resposta = await request(app)
            .post("/api/produtos")
            .send({
                nome: "",
                preco: -100,
                lancamento: 2006,
                plataforma: "Nintendo DS",
                avaliacao: 4,
                foto: "foto"
            });

        expect(resposta.status).toBe(400);
        expect(resposta.body).toHaveProperty("erro");
    });

});


describe("PUT /api/produtos/:id", () => {

    it("deve atualizar um produto", async () => {
        const resposta = await request(app)
            .put("/api/produtos/1")
            .send({
                preco: 300
            });

        expect(resposta.status).toBe(200);
        expect(resposta.body.mensagem).toBe("Produto Atualizado");
    });

    it("deve retornar erro ao atualizar produto inexistente", async () => {
        const resposta = await request(app)
            .put("/api/produtos/999999")
            .send({
                preco: 300
            });

        expect(resposta.status).toBe(500);
        expect(resposta.body).toHaveProperty("erro");
    });

});


describe("DELETE /api/produtos/:id", () => {

    it("deve remover um produto", async () => {
        const resposta = await request(app)
            .delete("/api/produtos/1");

        expect(resposta.status).toBe(200);
        expect(resposta.body.mensagem).toBe("Produto Removido");
    });

    it("deve retornar erro ao remover produto inexistente", async () => {
        const resposta = await request(app)
            .delete("/api/produtos/999999");

        expect(resposta.status).toBe(400);
        expect(resposta.body).toHaveProperty("erro");
    });

});
});