import { writeFile, readFile } from "fs/promises";
import { jsonRepositories } from "../jsonRepositories";
import { Produto } from "../../entities/produto";

describe("jsonRepositories", () => {

const arquivoTeste = "src/__tests__/produtos.test.json";

const criarProduto = () => {
    return new Produto(
        1,
        "Pokémon Diamond",
        200,
        2006,
        "Nintendo DS",
        9,
        "foto"
    );
};


describe("listarTodos()", () => {

    it("deve retornar todos os produtos", async () => {
        const produto = criarProduto();

        await writeFile(
            arquivoTeste,
            JSON.stringify([produto.toJson()])
        );

        const repository = new jsonRepositories(arquivoTeste);

        const produtos = await repository.listarTodos();

        expect(produtos).toHaveLength(1);
        expect(produtos[0]!.nome).toBe("Pokémon Diamond");
    });

    it("deve retornar array vazio quando o arquivo não existe", async () => {
        const repository = new jsonRepositories(
            "arquivo-que-nao-existe.json"
        );

        const produtos = await repository.listarTodos();

        expect(produtos).toEqual([]);
    });

});


describe("buscarPorId()", () => {

    it("deve encontrar um produto pelo ID", async () => {
        const produto = criarProduto();

        await writeFile(
            arquivoTeste,
            JSON.stringify([produto.toJson()])
        );

        const repository = new jsonRepositories(arquivoTeste);

        const resultado = await repository.buscarPorId(1);

        expect(resultado).toBeDefined();
        expect(resultado?.id).toBe(1);
        expect(resultado?.nome).toBe("Pokémon Diamond");
    });

    it("deve lançar erro quando o ID não existe", async () => {
        const produto = criarProduto();

        await writeFile(
            arquivoTeste,
            JSON.stringify([produto.toJson()])
        );

        const repository = new jsonRepositories(arquivoTeste);

        await expect(
            repository.buscarPorId(999)
        ).rejects.toThrow("Id Inválido");
    });

});


describe("criarItem()", () => {

    it("deve adicionar um novo produto", async () => {
        await writeFile(
            arquivoTeste,
            JSON.stringify([])
        );

        const repository = new jsonRepositories(arquivoTeste);

        const produto = criarProduto();

        await repository.criarItem(produto);

        const produtos = await repository.listarTodos();

        expect(produtos).toHaveLength(1);
        expect(produtos[0]!.id).toBe(1);
        expect(produtos[0]!.nome).toBe("Pokémon Diamond");
    });

});


describe("atualizarItem()", () => {

    it("deve atualizar os dados do produto", async () => {
        const produto = criarProduto();

        await writeFile(
            arquivoTeste,
            JSON.stringify([produto.toJson()])
        );

        const repository = new jsonRepositories(arquivoTeste);

        await repository.atualizarItem(1, {
            nome: "Pokémon Platinum",
            preco: 300,
            plataforma: "Nintendo DS"
        });

        const resultado = await repository.buscarPorId(1);

        expect(resultado?.nome).toBe("Pokémon Platinum");
        expect(resultado?.preco).toBe(300);
        expect(resultado?.plataforma).toBe("Nintendo DS");
    });

    it("deve atualizar somente o campo informado", async () => {
        const produto = criarProduto();

        await writeFile(
            arquivoTeste,
            JSON.stringify([produto.toJson()])
        );

        const repository = new jsonRepositories(arquivoTeste);

        await repository.atualizarItem(1, {
            preco: 500
        });

        const resultado = await repository.buscarPorId(1);

        expect(resultado?.preco).toBe(500);
        expect(resultado?.nome).toBe("Pokémon Diamond");
    });

    it("deve lançar erro ao atualizar ID inexistente", async () => {
        const repository = new jsonRepositories(arquivoTeste);

        await writeFile(
            arquivoTeste,
            JSON.stringify([])
        );

        await expect(
            repository.atualizarItem(999, {
                preco: 500
            })
        ).rejects.toThrow("Id Inválido");
    });

});


describe("removerItem()", () => {

    it("deve remover um produto", async () => {
        const produto = criarProduto();

        await writeFile(
            arquivoTeste,
            JSON.stringify([produto.toJson()])
        );

        const repository = new jsonRepositories(arquivoTeste);

        await repository.removerItem(1);

        const produtos = await repository.listarTodos();

        expect(produtos).toEqual([]);
    });

    it("deve lançar erro ao remover ID inexistente", async () => {
        await writeFile(
            arquivoTeste,
            JSON.stringify([])
        );

        const repository = new jsonRepositories(arquivoTeste);

        await expect(
            repository.removerItem(999)
        ).rejects.toThrow("Id Inválido");
    });

});
})