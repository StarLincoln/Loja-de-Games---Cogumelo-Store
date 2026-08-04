import { promises as fs } from "fs"
import path from "path"
import { Usuario } from "../entities/usuario"

export class UsuarioRepository {
    private caminhoArquivo = "../../dados/usuarios.json"

    private async carregarUsuarios(): Promise<Usuario[]> {
        try {
            const dados = await fs.readFile(this.caminhoArquivo, "utf-8")
            return JSON.parse(dados) as Usuario[]
        } catch (error: any) {
            if (error.code === "ENOENT") {
                await this.salvarUsuarios([])
                return []
            }
            throw error
        }
    }

    private async salvarUsuarios(usuarios: Usuario[]): Promise<void> {
        await fs.writeFile(
            this.caminhoArquivo,
            JSON.stringify(usuarios, null, 2),
            "utf-8"
        )
    }

    async criar(usuario: Usuario): Promise<Usuario> {
        const usuarios = await this.carregarUsuarios()
        usuarios.push(usuario)
        await this.salvarUsuarios(usuarios)

        return usuario
    }

    async buscarPorEmail(email: string): Promise<Usuario | undefined> {
        const usuarios = await this.carregarUsuarios()
        return usuarios.find(usuario => usuario.email === email)
    }
}