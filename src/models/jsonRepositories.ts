import { writeFile, readFile } from "fs/promises";
import { Produto } from "../entities/produto";

export class jsonRepositories {
    constructor(
        private arquivo: string,
    ){}

    private async carregar(): Promise<Produto[]> {
        try {
            const dadoBruto = await readFile(this.arquivo, "utf-8")
            const json = JSON.parse(dadoBruto)

            return json.map((obj: any) => Produto.fromJson(obj))
        } catch {
            await this.salvar([])
            return []
        }
    }
    private async salvar(dados: Produto[]): Promise<void> {
        const json = dados.map(x => x.toJson())
        await writeFile(this.arquivo, JSON.stringify(json, null, 2))
    }

    public async listarTodos(): Promise<Produto[]>{
        return await this.carregar()
    }
    public async buscarPorId(id: number): Promise<Produto | void > {
        const dados: Produto[] = await this.carregar()
        const index = dados.findIndex(i => i.id === id)

        if(index === -1) throw new Error("Id Inválido")

        return dados[index]
    }
    public async criarItem(add: Produto): Promise<void>{
        const dados: Produto[] = await this.carregar()
        dados.push(add)
        await this.salvar(dados)
    }
    public async atualizarItem(id: number, add: {nome?: string; preco?: number; lancamento?: number; plataforma?: string; avaliacao?: number}): Promise<void>{
        const dados: Produto[] = await this.carregar()

        const item = dados.find(i => i.id === id)
        if(!item) throw new Error("Id Inválido")

        if(add.nome !== undefined) item.nome = add.nome
        if(add.preco !== undefined) item.preco = add.preco
        if(add.lancamento !== undefined) item.lancamento = add.lancamento
        if(add.plataforma !== undefined) item.plataforma = add.plataforma
        if(add.avaliacao !== undefined) item.avaliacao = add.avaliacao

        await this.salvar(dados)
    }
    public async removerItem(id: number): Promise<void>{
        const dados: Produto[] = await this.carregar()
        const index = dados.findIndex(i => i.id === id)

        if(index === -1) throw new Error("Id Inválido")
        dados.splice(index, 1)

        await this.salvar(dados)
    }
}
