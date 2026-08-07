import { Produto } from "./produto";

export class Usuario {
    constructor(
        public id: number,
        public email: string,
        public senha: string,
    ){}
}