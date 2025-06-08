import { literal, Op } from "sequelize";

import db from "../model/index.js";
const {
  Artista,
  Banda,
  Disco,
  Instrumento,
  Localizacao,
  Musica,
  Musico,
  Produtor,
} = db;

async function getArtistas() {
  const artistas = await Artista.findAll({
    include: [
      {
        model: Banda,
        as: "banda",
        required: false, // LEFT JOIN banda
      },
      {
        model: Musico,
        as: "musico",
        required: false, // LEFT JOIN musico
        include: [
          { model: Instrumento, as: "instrumentos", required: false },
          { model: Localizacao, as: "localizacao", required: false },
        ],
      },
    ],
    where: {
      [Op.or]: [
        { "$banda.cod_banda$": { [Op.not]: null } },

        literal(`
          "musico"."nro_registro" IS NOT NULL
          AND NOT EXISTS (
            SELECT 1
              FROM musico_pertence_banda AS mpb
             WHERE mpb.nro_registro = "musico"."nro_registro"
          )
        `),
      ],
    },
    distinct: true,
  });

  return artistas.map((a) => a.get({ plain: true }));
}

async function getArtistaById(id_artista) {
  return await Artista.findOne({
    where: { id_artista },
    include: [
      {
        model: Banda,
        as: "banda",
      },
      {
        model: Musico,
        as: "musico",
        include: [
          {
            model: Instrumento,
            as: "instrumentos",
          },
          {
            model: Localizacao,
            as: "localizacao",
          },
        ],
      },
    ],
  });
}

async function getDiscosByIdArtista(id_artista) {
  return await Artista.findAll({
    where: { id_artista },
    include: [
      {
        model: Disco,
        as: "discos",
        include: [
          {
            model: Musica,
            as: "musicas",
          },
          {
            model: Produtor,
            as: "produtor",
          },
        ],
      },
    ],
  });
}

async function createArtista(dadosArtista) {
  const { generos_musicais, nome, url_imagem } = dadosArtista;

  return await Artista.create({
    nome,
    generos_musicais,
    url_imagem,
  });
}

async function deleteArtista(id_artista) {
  if (!id_artista) {
    throw new Error("Para deletar, informe { id_artista } do artista.");
  }

  const qtdDeletados = await Artista.destroy({
    where: { id_artista },
  });

  if (qtdDeletados === 0) {
    throw new Error(`Artista com id_artista="${id_artista}" não encontrado.`);
  }

  return true;
}

export {
  createArtista,
  deleteArtista,
  getArtistaById,
  getArtistas,
  getDiscosByIdArtista,
};
