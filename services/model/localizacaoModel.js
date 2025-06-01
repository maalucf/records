export default class Localizacao {
  constructor(id_localizacao, telefone, endereco) {
    if (
      id_localizacao === null ||
      id_localizacao === undefined ||
      id_localizacao === ""
    )
      throw new Error("Invalid id_localizacao.");

    if (!telefone || telefone.trim() === "")
      throw new Error("O campo telefone é obrigatório.");

    if (!endereco || endereco.trim() === "")
      throw new Error("O campo endereco é obrigatório.");

    this._id_localizacao = id_localizacao;
    this._telefone = telefone;
    this._endereco = endereco;
  }

  get id_localizacao() {
    return this._id_localizacao;
  }
  get telefone() {
    return this._telefone;
  }
  get endereco() {
    return this._endereco;
  }
}
