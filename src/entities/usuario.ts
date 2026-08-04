import { Produto } from "./produto";

export class Usuario {
    constructor(
        private _id: number,
        private _email: string,
        private _senha: string,
    ){}

    get id() { return this._id }
    get email() { return this._email }
    get senha() { return this._senha }
}