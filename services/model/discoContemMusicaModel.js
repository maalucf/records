export default class DiscoContemMusica {
  constructor(cod_disco, cod_musica) {
    if (cod_disco === null || cod_disco === undefined || cod_disco === "")
      throw new Error("Invalid cod_disco.");

    if (cod_musica === null || cod_musica === undefined || cod_musica === "")
      throw new Error("Invalid cod_musica.");

    this._cod_disco = cod_disco;
    this._cod_musica = cod_musica;
  }

  get cod_disco() {
    return this._cod_disco;
  }
  get cod_musica() {
    return this._cod_musica;
  }
}
