import db from "../model/index.js";
import { createArtista } from "./artistaRepository.js";
import { createOrFindMusico } from "./musicoRepository.js";
const { Artista, Banda, Instrumento, Localizacao, Musico } = db;

async function createBandaComMusicos(dados) {
  const {
    generos_musicais = null,
    musicos = [],
    nome,
    url_imagem = null,
  } = dados;

  const artista = await createArtista({ nome, generos_musicais, url_imagem });

  const banda = await artista.createBanda();

  if (!Array.isArray(musicos) || musicos.length === 0) {
    return banda;
  }

  const instanciasMusicos = [];
  for (const dadosMusico of musicos) {
    const instancia = await createOrFindMusico(dadosMusico);
    instanciasMusicos.push(instancia);
  }

  await banda.addMusicos(instanciasMusicos);

  await banda.reload({
    include: [
      {
        model: Musico,
        as: "musicos",
        include: [{ model: Instrumento, as: "instrumentos" }],
      },
    ],
  });

  return banda;
}

async function updateBandaComMusicos(id_artista, dados) {
  const {
    generos_musicais = null,
    musicos = [],
    nome,
    url_imagem = null,
  } = dados;

  // Busca a Banda
  const banda = await Banda.findOne(
    { 
      where: { id_artista },
      include: [{ model: Artista, as: "artista" }],
    }
  );
  if (!banda) {
    throw new Error(`Banda com id_artista=${id_artista} não encontrada.`);
  }

  // Atualiza o Artista
  const artista = banda.artista;
  const camposArtistaParaAtualizar = {};
  if (nome !== undefined) {
    camposArtistaParaAtualizar.nome = nome;
  }
  if (generos_musicais !== undefined) {
    camposArtistaParaAtualizar.generos_musicais = generos_musicais;
  }
  if (url_imagem !== undefined) {
    camposArtistaParaAtualizar.url_imagem = url_imagem;
  }
  if (Object.keys(camposArtistaParaAtualizar).length > 0) {
    await artista.update(camposArtistaParaAtualizar);
  }

  // Atualiza os Músicos
  if (Array.isArray(musicos)) {
    const instanciasMusicos = [];

    for (const dadosMusico of musicos) {
      dadosMusico.artistas = [{ id_artista: artista.id_artista }];

      const instancia = await createOrFindMusico(dadosMusico);
      instanciasMusicos.push(instancia);
    }

    await banda.setMusicos(instanciasMusicos);
  }

  await banda.reload({
    include: [
      { model: Artista, as: "artista" },
      {
        model: Musico,
        as: "musicos",
        include: [
          { model: Instrumento, as: "instrumentos" },
          { model: Localizacao, as: "localizacao" },
        ],
      },
    ],
  });

  return banda;
}

export { createBandaComMusicos, updateBandaComMusicos };
