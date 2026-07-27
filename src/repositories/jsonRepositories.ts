import { writeFile, readFile } from "fs/promises";
import { IEntidade } from "../entities/produto";

export class jsonRepositories <T extends IEntidade> {
    constructor(
        private arquivo: string,
        private fromJSON: (obj:any) => T
    ){}

    private async carregar(): Promise<any[]> {
        const dadoBruto = await readFile(this.arquivo, "utf-8")
        const json = JSON.parse(dadoBruto)

        return json.map((obj: any) => this.fromJSON(obj))
    }
    private async salvar(dados: any) {
        await writeFile(this.arquivo, JSON.stringify(dados, null, 2))
    }

    private async listarTodos(){
        return this.carregar()
    }
    private async buscarPorId(id: number){
        const dados: any[] = await this.carregar()
        const index = dados.findIndex(i => i.id = id)

        if(index === -1) return "Id inexistente"

        return dados[index]
    }
    private async criarItem(add: any){
        const dados: any[] = await this.carregar()
        dados.push(add)
        this.salvar(dados)
    }
}
