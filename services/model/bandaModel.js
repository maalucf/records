export default class Banda {
  constructor(cod_banda, id_artista) {
    if (cod_banda === null || cod_banda === undefined || cod_banda === "")
      throw new Error("Invalid cod_banda.");

    if (id_artista === null || id_artista === undefined || id_artista === "")
      throw new Error("Invalid id_artista.");

    this._cod_banda = cod_banda;
    this._id_artista = id_artista;
  }

  get cod_banda() {
    return this._cod_banda;
  }
  get id_artista() {
    return this._id_artista;
  }
}
