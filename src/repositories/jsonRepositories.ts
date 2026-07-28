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

    private async listarTodos(){
        return this.carregar()
    }
    private async buscarPorId(id: number): Promise<T | undefined>{
        const dados: T[] = await this.carregar()
        const index = dados.findIndex(i => i.id === id)

        if(index === -1) return undefined

        return dados[index]
    }
    private async criarItem(add: any): Promise<void>{
        const dados: T[] = await this.carregar()
        dados.push(add)
        await this.salvar(dados)
    }
    private async atualizarItem(id: number, add: any): Promise<void>{
        const dados: T[] = await this.carregar()
        const index = dados.findIndex(i => i.id === id)

        if(index === -1) return undefined
        dados[index] = {... dados[index], ...add}

        await this.salvar(dados)
    }
    private async removerItem(id: number): Promise<void>{
        const dados: T[] = await this.carregar()
        const index = dados.findIndex(i => i.id === id)

        if(index === -1) return undefined
        dados.splice(index, 1)

        await this.salvar(dados)
    }
}
