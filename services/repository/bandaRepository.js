import db from "../model/index.js";
import { createArtista } from "./artistaRepository.js";
import { createOrFindMusico } from "./musicoRepository.js";
const { Instrumento, Musico } = db;

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
    const musicoInstance = await createOrFindMusico(dadosMusico);
    instanciasMusicos.push(musicoInstance);
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

export { createBandaComMusicos };
