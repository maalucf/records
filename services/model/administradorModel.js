export default class Administrador {
  constructor(id_administrador, nome, email, senha) {
    if (
      id_administrador === null ||
      id_administrador === undefined ||
      id_administrador === ""
    )
      throw new Error("Invalid id_administrador.");

    if (!nome || nome.trim() === "")
      throw new Error("O campo nome é obrigatório.");

    if (!email || email.trim() === "")
      throw new Error("O campo email é obrigatório.");

    if (!senha || senha.trim() === "")
      throw new Error("O campo senha é obrigatório.");

    this._id_administrador = id_administrador;
    this._nome = nome;
    this._email = email;
    this._senha = senha;
  }

  get id_administrador() {
    return this._id_administrador;
  }
  get nome() {
    return this._nome;
  }
  get email() {
    return this._email;
  }
  get senha() {
    return this._senha;
  }
}
