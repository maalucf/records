import db from "../model/index.js";
const { Instrumento } = db;

export async function createOrFindInstrumento(dadosInstrumento) {
  const { cod_instrumento, nome } = dadosInstrumento || {};

  if (cod_instrumento && !nome) {
    const inst = await Instrumento.findByPk(cod_instrumento);
    if (!inst) {
      throw new Error(
        `Instrumento com cod_instrumento=${cod_instrumento} não encontrado.`
      );
    }
    return inst;
  }

  if (!nome) {
    throw new Error("Para criar novo Instrumento, informe { nome }.");
  }

  let existente = await Instrumento.findOne({ where: { nome } });
  if (existente) {
    return existente;
  }

  return await Instrumento.create({ nome });
}
