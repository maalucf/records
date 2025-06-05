import db from "../model/index.js";
const { Localizacao } = db;

export async function createOrFindLocalizacao(dadosLocalizacao) {
  const { endereco, id_localizacao, telefone } = dadosLocalizacao || {};

  if (id_localizacao) {
    const loc = await Localizacao.findByPk(id_localizacao);
    if (!loc) {
      throw new Error(
        `Localização com id_localizacao=${id_localizacao} não encontrada.`
      );
    }
    return loc;
  }

  if (!telefone || !endereco) {
    throw new Error(
      "Para criar nova Localizacao, informe { telefone, endereco }."
    );
  }

  const localizacao = await Localizacao.findOne({ where: { endereco } });
  if (localizacao) {
    return localizacao;
  }

  return await Localizacao.create({ telefone, endereco });
}
