import db from "../model/index.js";
import { createArtista } from "./artistaRepository.js";
import { createOrFindInstrumento } from "./instrumentoRepository.js";
import { createOrFindLocalizacao } from "./localizacaoRepository.js";

const { Instrumento, Musico } = db;

async function createOrFindMusico(dadosMusico) {
  const {
    generos_musicais,
    instrumentos = [],
    localizacao,
    nome,
    nro_registro,
    url_imagem,
  } = dadosMusico;

  if (nro_registro && !nome) {
    const existente = await Musico.findByPk(nro_registro, {
      include: [{ model: Instrumento, as: "instrumentos" }],
    });
    if (!existente) {
      throw new Error(
        `Músico com nro_registro="${nro_registro}" não encontrado.`
      );
    }
    return existente;
  }

  if (!nome || !nro_registro || !localizacao) {
    throw new Error(
      "Para criar novo músico, informe { nome, nro_registro, localizacao }."
    );
  }

  const locInst = await createOrFindLocalizacao(localizacao);

  const artista = await createArtista({ nome, generos_musicais, url_imagem });

  const musico = await artista.createMusico({
    nro_registro,
    id_localizacao: locInst.id_localizacao,
  });

  if (Array.isArray(instrumentos) && instrumentos.length > 0) {
    const instancias = [];
    for (const dadosInst of instrumentos) {
      const inst = await createOrFindInstrumento(dadosInst);
      instancias.push(inst);
    }
    await musico.addInstrumentos(instancias);
  }

  await musico.reload({
    include: [{ model: Instrumento, as: "instrumentos" }],
  });

  return musico;
}

export { createOrFindMusico };
