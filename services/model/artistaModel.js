export default class Artista {
  constructor(id_artista, nome) {
    if (id_artista === null || id_artista === undefined || id_artista === "")
      throw new Error("Invalid id_artista.");

    if (!nome || nome.trim() === "")
      throw new Error("O campo nome é obrigatório.");

    this._id_artista = id_artista;
    this._nome = nome;
  }

  get id_artista() {
    return this._id_artista;
  }
  get nome() {
    return this._nome;
  }
}
