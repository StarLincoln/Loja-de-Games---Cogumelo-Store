export interface IEntidade { id: number}

export interface Produto {
    id: number;
    nome: string;
    lancamento: string;
    plataforma: string;
    avaliacao: number | null;
}