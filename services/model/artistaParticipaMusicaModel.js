export default class ArtistaParticipaMusica {
  constructor(id_artista, cod_musica) {
    if (id_artista === null || id_artista === undefined || id_artista === "")
      throw new Error("Invalid id_artista.");

    if (cod_musica === null || cod_musica === undefined || cod_musica === "")
      throw new Error("Invalid cod_musica.");

    this._id_artista = id_artista;
    this._cod_musica = cod_musica;
  }

  get id_artista() {
    return this._id_artista;
  }
  get cod_musica() {
    return this._cod_musica;
  }
}
