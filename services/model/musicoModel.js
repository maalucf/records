export default class Musico {
  constructor(nro_registro, id_artista, id_localizacao) {
    if (!nro_registro || nro_registro.trim() === "")
      throw new Error("O campo nro_registro é obrigatório.");

    if (id_artista === null || id_artista === undefined || id_artista === "")
      throw new Error("Invalid id_artista.");

    if (
      id_localizacao === null ||
      id_localizacao === undefined ||
      id_localizacao === ""
    )
      throw new Error("Invalid id_localizacao.");

    this._nro_registro = nro_registro;
    this._id_artista = id_artista;
    this._id_localizacao = id_localizacao;
  }

  get nro_registro() {
    return this._nro_registro;
  }
  get id_artista() {
    return this._id_artista;
  }
  get id_localizacao() {
    return this._id_localizacao;
  }
}
