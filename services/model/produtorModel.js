export default class Produtor {
  constructor(cod_produtor, nome) {
    if (
      cod_produtor === null ||
      cod_produtor === undefined ||
      cod_produtor === ""
    )
      throw new Error("Invalid cod_produtor.");

    if (!nome || nome.trim() === "")
      throw new Error("O campo nome é obrigatório.");

    this._cod_produtor = cod_produtor;
    this._nome = nome;
  }

  get cod_produtor() {
    return this._cod_produtor;
  }
  get nome() {
    return this._nome;
  }
}
