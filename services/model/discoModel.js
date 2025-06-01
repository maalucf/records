export default class Disco {
  constructor(cod_disco, titulo, formato, data, id_artista, cod_produtor) {
    if (cod_disco === null || cod_disco === undefined || cod_disco === "")
      throw new Error("Invalid cod_disco.");

    if (!titulo || titulo.trim() === "")
      throw new Error("O campo titulo é obrigatório.");

    if (!formato || formato.trim() === "")
      throw new Error("O campo formato é obrigatório.");

    if (!data || !(data instanceof Date))
      throw new Error("O campo data precisa ser um objeto Date válido.");

    if (id_artista === null || id_artista === undefined || id_artista === "")
      throw new Error("Invalid id_artista.");

    if (
      cod_produtor === null ||
      cod_produtor === undefined ||
      cod_produtor === ""
    )
      throw new Error("Invalid cod_produtor.");

    this._cod_disco = cod_disco;
    this._titulo = titulo;
    this._formato = formato;
    this._data = data;
    this._id_artista = id_artista;
    this._cod_produtor = cod_produtor;
  }

  get cod_disco() {
    return this._cod_disco;
  }
  get titulo() {
    return this._titulo;
  }
  get formato() {
    return this._formato;
  }
  get data() {
    return this._data;
  }
  get id_artista() {
    return this._id_artista;
  }
  get cod_produtor() {
    return this._cod_produtor;
  }
}
