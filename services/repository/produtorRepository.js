import db from "../model/index.js";
const { Produtor } = db;

async function createOrFindProdutor(dadosProdutor) {
  const { cod_produtor, nome } = dadosProdutor || {};

  if (cod_produtor && !nome) {
    const existente = await Produtor.findByPk(cod_produtor);
    if (!existente) {
      throw new Error(
        `Produtor com cod_produtor=${cod_produtor} não encontrado.`
      );
    }
    return existente;
  }

  if (!nome) {
    throw new Error("Para criar novo Produtor, informe { nome }.");
  }

  let produtor = await Produtor.findOne({ where: { nome } });
  if (produtor) {
    return produtor;
  }

  return await Produtor.create({ nome });
}

export { createOrFindProdutor };
