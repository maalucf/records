import db from "../model/index.js";
const { Administrador } = db;

async function getAdministradorByEmail(email) {
  return await Administrador.findOne({
    where: { email },
  });
}

async function loginAdministrador(email, senha) {
  const admin = await getAdministradorByEmail(email);
  if (!admin) {
    return { admin: null, error: "EMAIL_NAO_ENCONTRADO" };
  }

  const senhaValida = await admin.validPassword(senha);
  if (!senhaValida) {
    return { admin: null, error: "SENHA_INVALIDA" };
  }

  return { admin, error: null };
}

async function createAdministrador({ email, nome, senha }) {
  const novoAdmin = await Administrador.create({ nome, email, senha });
  return novoAdmin;
}

export { createAdministrador, getAdministradorByEmail, loginAdministrador };
