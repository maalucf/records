import db from "../model/index.js";
import { findOrCreateMusica } from "./musicaRepository.js";
import { createOrFindProdutor } from "./produtorRepository.js";
const { Disco, Musica, Produtor } = db;

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
  }

  await novoDisco.addMusicas(instanciasMusicas);

  await novoDisco.reload({
    include: [
      { model: Musica, as: "musicas" },
      { model: Produtor, as: "produtor" },
    ],
  });

  return novoDisco;
}

export { createDiscoComMusicas, getDiscoById, getDiscos };
