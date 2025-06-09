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

  if (titulo) {
    const existente = await Musica.findOne({
      where: { titulo },
      include: [{ model: Artista, as: "artistas" }],
    });
    if (existente) {
      return existente;
    }
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

async function updateMusica(dadosMusica) {
  const { cod_musica, titulo, duracao, artistas = [] } = dadosMusica || {};

  let musica;
  if (cod_musica) {
    musica = await Musica.findByPk(cod_musica, {
      include: [{ model: Artista, as: "artistas" }],
    });
  } else if (titulo) {
    musica = await Musica.findOne({
      where: { titulo },
      include: [{ model: Artista, as: "artistas" }],
    });
  }

  if (!musica) {
    return await findOrCreateMusica(dadosMusica);
  }

  const camposParaAtualizar = {};
  if (titulo != null) camposParaAtualizar.titulo = titulo;
  if (duracao != null) camposParaAtualizar.duracao = duracao;

  if (Object.keys(camposParaAtualizar).length > 0) {
    await musica.update(camposParaAtualizar);
  }

  if (artistas !== undefined) {
    console.log("Dados dos artistas:", artistas);
    if (!Array.isArray(artistas)) {
      throw new Error(
        "O campo artistas deve ser um array de objetos { id_artista }."
      );
    }

    const instanciasArtistas = [];
    for (const dadoArt of artistas) {
      const { id_artista } = dadoArt;
      if (!id_artista) {
        throw new Error(
          "Em cada objeto de artistas, informe sempre { id_artista }."
        );
      }
      const art = await Artista.findByPk(id_artista);
      if (!art) {
        throw new Error(`Artista com id_artista=${id_artista} não encontrado.`);
      }
      instanciasArtistas.push(art);
    }

    await musica.setArtistas(instanciasArtistas);
  }

  await musica.reload({
    include: [{ model: Artista, as: "artistas" }],
  });

  return musica;
}

export { findOrCreateMusica, updateMusica };
