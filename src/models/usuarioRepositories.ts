import { Usuario } from "../entities/usuario"

export class UsuarioRepository {

    private usuarios: Usuario[] = []

    async criar(usuario: Usuario): Promise<Usuario> {
        this.usuarios.push(usuario)

        return usuario
    }

    async buscarPorEmail(email: string): Promise<Usuario | undefined> {
        return this.usuarios.find(
            usuario => usuario.email === email
        )
    }
}