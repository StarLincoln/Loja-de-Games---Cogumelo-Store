export interface IEntidade {
  id: number;
  toJson(): object;
}

export class Produto implements IEntidade {
  private _id: number;
  private _nome: string;
  private _preco: number;
  private _lancamento: number;
  private _plataforma: string;
  private _avaliacao: number | null

  constructor(
    id: number,
    nome: string,
    preco: number,
    lancamento: number,
    plataforma: string,
    avaliacao: number | null,
  ) {
    this._id = id;
    this._nome = nome;
    this._preco = preco;
    this._lancamento = lancamento;
    this._plataforma = plataforma;
    this._avaliacao = avaliacao;
  }

  get id(): number {
    return this._id;
  }
  get nome(): string {
    return this._nome;
  }
  get preco(): number {
    return this._preco;
  }
  get lancamento(): number {
    return this._lancamento;
  }
  get plataforma(): string {
    return this._plataforma;
  }
  get avaliacao(): number | null {
    return this._avaliacao;
  }

  set nome(dado: string) {
    if (!dado || dado.trim() === "") throw new Error("Erro! Preencha o nome");
    this._nome = dado.trim();
  }
  set preco(dado: number) {
    if (dado <= 0) throw new Error("Erro! O preço não pode ser negativo");
    this._preco = dado;
  }
  set lancamento(dado: number) {
    if (dado < 1950 || dado > Number(new Date().getFullYear()))
      throw new Error("Erro! Ano inválido");
    this._lancamento = dado;
  }
  set plataforma(dado: string) {
    if (!dado || dado.trim() === "")
      throw new Error("Erro! Preencha o plataforma");
    this._plataforma = dado.trim();
  }
  set avaliacao(dado: number | null) {
    this._avaliacao = dado;
  }
  static fromJson(json: any): Produto {
    return new Produto(
      json.id,
      json.nome,
      json.preco,
      json.lancamento,
      json.plataforma,
      json.avaliacao ?? null,
    );
  }
  toJson(): object {
    return {
      id: this._id,
      nome: this._nome,
      preco: this._preco,
      lancamento: this._lancamento,
      plataforma: this._plataforma,
      avaliacao: this._avaliacao,
    };
  }
}
