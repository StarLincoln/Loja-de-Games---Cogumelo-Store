import { writeFile, readFile } from "fs/promises";
import { IEntidade } from "../entities/produto";

export class jsonRepositories <T extends IEntidade> {
    constructor(
        private arquivo: string,
        private fromJSON: (obj:any) => T
    ){}

    private async carregar(): Promise<T[]> {
        const dadoBruto = await readFile(this.arquivo, "utf-8")
        const json = JSON.parse(dadoBruto)

        return json.map((obj: any) => this.fromJSON(obj))
    }
    private async salvar(dados: T[]): Promise<void> {
        await writeFile(this.arquivo, JSON.stringify(dados, null, 2))
    }

    public async listarTodos(): Promise<T[]>{
        return this.carregar()
    }
    public async buscarPorId(id: number): Promise<T | void > {
        const dados: T[] = await this.carregar()
        const index = dados.findIndex(i => i.id === id)

        if(index === -1) throw new Error("Id Inválido")

        return dados[index]
    }
    public async criarItem(add: any): Promise<void>{
        const dados: T[] = await this.carregar()
        dados.push(add)
        await this.salvar(dados)
    }
    public async atualizarItem(id: number, add: any): Promise<void>{
        const dados: T[] = await this.carregar()
        const index = dados.findIndex(i => i.id === id)

        if(index === -1) throw new Error("Id Inválido")
        dados[index] = {... dados[index], ...add}

        await this.salvar(dados)
    }
    public async removerItem(id: number): Promise<void>{
        const dados: T[] = await this.carregar()
        const index = dados.findIndex(i => i.id === id)

        if(index === -1) throw new Error("Id Inválido")
        dados.splice(index, 1)

        await this.salvar(dados)
    }
}
