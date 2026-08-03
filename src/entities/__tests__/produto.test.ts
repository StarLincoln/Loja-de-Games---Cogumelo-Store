import { Produto } from "../produto";

describe("Constructor", () => {

    it("deve criar um produto com os dados fornecidos", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        expect(produto.id).toBe(1);
        expect(produto.nome).toBe("Pokémon Diamond");
        expect(produto.preco).toBe(200);
        expect(produto.lancamento).toBe(2006);
        expect(produto.plataforma).toBe("Nintendo DS");
        expect(produto.avaliacao).toBe(9);
    });

    it("deve aceitar avaliação nula", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            null
        );

        expect(produto.avaliacao).toBeNull();
    });

});


describe("Setter nome", () => {

    it("deve alterar o nome do produto", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        produto.nome = "Pokémon Platinum";

        expect(produto.nome).toBe("Pokémon Platinum");
    });

    it("deve remover espaços extras do nome", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        produto.nome = "  Pokémon Platinum  ";

        expect(produto.nome).toBe("Pokémon Platinum");
    });

    it("deve rejeitar nome vazio", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        expect(() => {
            produto.nome = "";
        }).toThrow("Erro! Preencha o nome");
    });

    it("deve rejeitar nome contendo apenas espaços", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        expect(() => {
            produto.nome = "     ";
        }).toThrow("Erro! Preencha o nome");
    });

});


describe("Setter preco", () => {

    it("deve alterar o preço", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        produto.preco = 300;

        expect(produto.preco).toBe(300);
    });

    it("deve rejeitar preço igual a zero", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        expect(() => {
            produto.preco = 0;
        }).toThrow("Erro! O preço não pode ser negativo");
    });

    it("deve rejeitar preço negativo", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        expect(() => {
            produto.preco = -100;
        }).toThrow("Erro! O preço não pode ser negativo");
    });

});


describe("Setter lancamento", () => {

    it("deve alterar o ano de lançamento", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        produto.lancamento = 2007;

        expect(produto.lancamento).toBe(2007);
    });

    it("deve rejeitar ano anterior a 1950", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        expect(() => {
            produto.lancamento = 1949;
        }).toThrow("Erro! Ano inválido");
    });

    it("deve rejeitar ano futuro", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        const anoFuturo = new Date().getFullYear() + 1;

        expect(() => {
            produto.lancamento = anoFuturo;
        }).toThrow("Erro! Ano inválido");
    });

});


describe("Setter plataforma", () => {

    it("deve alterar a plataforma", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        produto.plataforma = "Nintendo Switch";

        expect(produto.plataforma).toBe("Nintendo Switch");
    });

    it("deve rejeitar plataforma vazia", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        expect(() => {
            produto.plataforma = "";
        }).toThrow("Erro! Preencha o plataforma");
    });

});


describe("Setter avaliacao", () => {

    it("deve alterar a avaliação", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        produto.avaliacao = 10;

        expect(produto.avaliacao).toBe(10);
    });

    it("deve aceitar avaliação nula", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        produto.avaliacao = null;

        expect(produto.avaliacao).toBeNull();
    });

});


describe("fromJson()", () => {

    it("deve transformar JSON em uma instância de Produto", () => {
        const json = {
            id: 1,
            nome: "Pokémon Diamond",
            preco: 200,
            lancamento: 2006,
            plataforma: "Nintendo DS",
            avaliacao: 9
        };

        const produto = Produto.fromJson(json);

        expect(produto).toBeInstanceOf(Produto);
        expect(produto.id).toBe(1);
        expect(produto.nome).toBe("Pokémon Diamond");
        expect(produto.preco).toBe(200);
        expect(produto.lancamento).toBe(2006);
        expect(produto.plataforma).toBe("Nintendo DS");
        expect(produto.avaliacao).toBe(9);
    });

    it("deve transformar avaliação ausente em null", () => {
        const json = {
            id: 1,
            nome: "Pokémon Diamond",
            preco: 200,
            lancamento: 2006,
            plataforma: "Nintendo DS"
        };

        const produto = Produto.fromJson(json);

        expect(produto.avaliacao).toBeNull();
    });

});


describe("toJson()", () => {

    it("deve transformar Produto em JSON", () => {
        const produto = new Produto(
            1,
            "Pokémon Diamond",
            200,
            2006,
            "Nintendo DS",
            9
        );

        expect(produto.toJson()).toEqual({
            id: 1,
            nome: "Pokémon Diamond",
            preco: 200,
            lancamento: 2006,
            plataforma: "Nintendo DS",
            avaliacao: 9
        });
    });

});
