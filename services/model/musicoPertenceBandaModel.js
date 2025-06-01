export default class MusicoPertenceBanda {
  constructor(nro_registro, cod_banda) {
    if (!nro_registro || nro_registro.trim() === "")
      throw new Error("O campo nro_registro é obrigatório.");

    if (cod_banda === null || cod_banda === undefined || cod_banda === "")
      throw new Error("Invalid cod_banda.");

    this._nro_registro = nro_registro;
    this._cod_banda = cod_banda;
  }

  get nro_registro() {
    return this._nro_registro;
  }
  get cod_banda() {
    return this._cod_banda;
  }
}
