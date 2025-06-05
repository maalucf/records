import db from "../model/index.js";
import { findOrCreateMusica } from "./musicaRepository.js";
import { createOrFindProdutor } from "./produtorRepository.js";
const { Artista, Disco, Musica, Produtor } = db;

async function getDiscos() {
  return await Disco.findAll({
    include: [
      { model: Musica, as: "musicas" },
      { model: Produtor, as: "produtor" },
    ],
  });
}

async function getDiscoById(cod_disco) {
  return await Disco.findByPk(cod_disco, {
    include: [
      { model: Musica, as: "musicas" },
      { model: Produtor, as: "produtor" },
    ],
  });
}

async function createDiscoComMusicas(dadosDisco) {
  const {
    data,
    formato,
    id_artista,
    musicas = [],
    produtor,
    titulo,
    url_imagem = null,
  } = dadosDisco;

  if (!produtor || (!produtor.cod_produtor && !produtor.nome)) {
    throw new Error(
      "Para criar Disco, informe { produtor: { cod_produtor? ou nome } }."
    );
  }
  const produtorInst = await createOrFindProdutor(produtor);
  const cod_produtor = produtorInst.cod_produtor;

  const novoDisco = await Disco.create({
    titulo,
    formato,
    data,
    id_artista,
    cod_produtor,
    url_imagem,
  });

  if (!Array.isArray(musicas) || musicas.length === 0) {
    await novoDisco.reload({
      include: [{ model: Produtor, as: "produtor" }],
    });
    return novoDisco;
  }

  const instanciasMusicas = [];
  for (const umaMusica of musicas) {
    const instancia = await findOrCreateMusica(umaMusica);
    instanciasMusicas.push(instancia);

    await instancia.addArtista(id_artista);
  }

  await novoDisco.addMusicas(instanciasMusicas);

  await novoDisco.reload({
    include: [
      {
        model: Musica,
        as: "musicas",
        include: [{ model: Artista, as: "artistas" }],
      },
      { model: Produtor, as: "produtor" },
    ],
  });

  return novoDisco;
}

async function updateDiscoComMusicas(cod_disco, dadosDisco) {
  const {
    data,
    formato,
    id_artista,
    musicas = [],
    produtor,
    titulo,
    url_imagem,
  } = dadosDisco;

  // Busca o Disco
  const disco = await Disco.findByPk(cod_disco, {
    include: [
      { model: Produtor, as: "produtor" },
      { model: Artista, as: "artista" },
    ],
  });
  if (!disco) {
    throw new Error(`Disco com cod_disco=${cod_disco} não encontrado.`);
  }

  // Atualiza o Disco
  const camposParaAtualizar = {};
  if (titulo !== undefined) camposParaAtualizar.titulo = titulo;
  if (formato !== undefined) camposParaAtualizar.formato = formato;
  if (data !== undefined) camposParaAtualizar.data = data;
  if (url_imagem !== undefined) camposParaAtualizar.url_imagem = url_imagem;

  if (id_artista !== undefined) {
    camposParaAtualizar.id_artista = id_artista;
  }

  if (produtor !== undefined) {
    if (!produtor.cod_produtor && !produtor.nome) {
      throw new Error(
        "Para atualizar Disco, informe { produtor: { cod_produtor? ou nome } }."
      );
    }
    const produtorInst = await createOrFindProdutor(produtor);
    camposParaAtualizar.cod_produtor = produtorInst.cod_produtor;
  }

  if (Object.keys(camposParaAtualizar).length > 0) {
    await disco.update(camposParaAtualizar);
  }

  // Atualiza as Músicas
  if (Array.isArray(musicas)) {
    const instanciasMusicas = [];
    for (const umaMusica of musicas) {
      const instancia = await findOrCreateMusica(umaMusica);
      instanciasMusicas.push(instancia);

      await instancia.addArtista(id_artista);
    }
    await disco.setMusicas(instanciasMusicas);
  }

  await disco.reload({
    include: [
      {
        model: Musica,
        as: "musicas",
        include: [{ model: Artista, as: "artistas" }],
      },
      { model: Produtor, as: "produtor" },
    ],
  });

  return disco;
}

export {
  createDiscoComMusicas,
  getDiscoById,
  getDiscos,
  updateDiscoComMusicas,
};
