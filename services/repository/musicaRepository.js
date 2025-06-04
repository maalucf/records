import db from "../model/index.js";
const { Artista, Musica } = db;

async function findOrCreateMusica(dadosMusica) {
  const {
    artistas = [],
    cod_musica,
    duracao = null,
    titulo,
  } = dadosMusica || {};

  if (cod_musica) {
    const existente = await Musica.findByPk(cod_musica, {
      include: [{ model: Artista, as: "artistas" }],
    });
    if (!existente) {
      throw new Error(`Música com cod_musica=${cod_musica} não encontrada.`);
    }
    return existente;
  }

  if (!titulo) {
    throw new Error("Para criar nova música, informe { titulo }.");
  }

  const nova = await Musica.create({ titulo, duracao });

  if (Array.isArray(artistas) && artistas.length > 0) {
    const instanciasArtistas = [];

    for (const dadoArt of artistas) {
      const { id_artista } = dadoArt;

      if (!id_artista) {
        throw new Error(
          "Ao vincular artista a música, informe sempre { id_artista }."
        );
      }

      const artistaInst = await Artista.findByPk(id_artista);
      if (!artistaInst) {
        throw new Error(`Artista com id_artista=${id_artista} não encontrado.`);
      }

      instanciasArtistas.push(artistaInst);
    }

    await nova.addArtistas(instanciasArtistas);
  }

  await nova.reload({
    include: [{ model: Artista, as: "artistas" }],
  });

  return nova;
}

export { findOrCreateMusica };
