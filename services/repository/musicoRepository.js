import db from "../model/index.js";
import { createArtista } from "./artistaRepository.js";
import { createOrFindInstrumento } from "./instrumentoRepository.js";
import { createOrFindLocalizacao } from "./localizacaoRepository.js";

const { Artista, Instrumento, Localizacao, Musico } = db;

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

async function updateMusico(nro_registro, dadosMusico) {
  const { generos_musicais, instrumentos, localizacao, nome, url_imagem } =
    dadosMusico;

  if (!nro_registro) {
    throw new Error("Para atualizar, informe { nro_registro } do músico.");
  }

  // Busca o Músico
  const musico = await Musico.findByPk(nro_registro, {
    include: [
      { model: Instrumento, as: "instrumentos" },
      { model: Localizacao, as: "localizacao" },
      { model: Artista, as: "artista" },
    ],
  });
  if (!musico) {
    throw new Error(
      `Músico com nro_registro="${nro_registro}" não encontrado.`
    );
  }

  // Atualiza o Artista
  const artista = musico.artista;
  const camposArtista = {};
  if (nome !== undefined) camposArtista.nome = nome;
  if (generos_musicais !== undefined)
    camposArtista.generos_musicais = generos_musicais;
  if (url_imagem !== undefined) camposArtista.url_imagem = url_imagem;
  if (Object.keys(camposArtista).length > 0) {
    await artista.update(camposArtista);
  }

  // Atualiza a Localização
  if (localizacao !== undefined) {
    const locInst = await createOrFindLocalizacao(localizacao);
    if (musico.id_localizacao !== locInst.id_localizacao) {
      await musico.update({ id_localizacao: locInst.id_localizacao });
    }
  }

  // Atualiza os Instrumentos
  if (Array.isArray(instrumentos)) {
    const instancias = [];
    for (const dadosInst of instrumentos) {
      const inst = await createOrFindInstrumento(dadosInst);
      instancias.push(inst);
    }
    await musico.setInstrumentos(instancias);
  }

  await musico.reload({
    include: [
      { model: Artista, as: "artista" },
      { model: Localizacao, as: "localizacao" },
      { model: Instrumento, as: "instrumentos" },
    ],
  });

  return musico;
}

export { createOrFindMusico, updateMusico };
