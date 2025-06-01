export default class Instrumento {
  constructor(cod_instrumento, nome) {
    if (
      cod_instrumento === null ||
      cod_instrumento === undefined ||
      cod_instrumento === ""
    )
      throw new Error("Invalid cod_instrumento.");

    if (!nome || nome.trim() === "")
      throw new Error("O campo nome é obrigatório.");

    this._cod_instrumento = cod_instrumento;
    this._nome = nome;
  }

  get cod_instrumento() {
    return this._cod_instrumento;
  }
  get nome() {
    return this._nome;
  }
}
