export default class MusicoTocaInstrumento {
  constructor(nro_registro, cod_instrumento) {
    if (!nro_registro || nro_registro.trim() === "")
      throw new Error("O campo nro_registro é obrigatório.");

    if (
      cod_instrumento === null ||
      cod_instrumento === undefined ||
      cod_instrumento === ""
    )
      throw new Error("Invalid cod_instrumento.");

    this._nro_registro = nro_registro;
    this._cod_instrumento = cod_instrumento;
  }

  get nro_registro() {
    return this._nro_registro;
  }
  get cod_instrumento() {
    return this._cod_instrumento;
  }
}
