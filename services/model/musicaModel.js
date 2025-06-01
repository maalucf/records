export default class Musica {
  constructor(cod_musica, titulo) {
    if (cod_musica === null || cod_musica === undefined || cod_musica === "")
      throw new Error("Invalid cod_musica.");

    if (!titulo || titulo.trim() === "")
      throw new Error("O campo titulo é obrigatório.");

    this._cod_musica = cod_musica;
    this._titulo = titulo;
  }

  get cod_musica() {
    return this._cod_musica;
  }
  get titulo() {
    return this._titulo;
  }
}
