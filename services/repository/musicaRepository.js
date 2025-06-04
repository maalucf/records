import db from "../model/index.js";
const { Musica } = db;

async function findOrCreateMusica(dadosMusica) {
  const { cod_musica, duracao = null, titulo } = dadosMusica;

  if (cod_musica) {
    const existente = await Musica.findByPk(cod_musica);
    if (!existente) {
      throw new Error(`Musica com cod_musica=${cod_musica} não encontrada.`);
    }
    return existente;
  }

  const nova = await Musica.create({ titulo, duracao });
  return nova;
}

export { findOrCreateMusica };
