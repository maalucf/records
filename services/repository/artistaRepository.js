import { literal,Op } from "sequelize";

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
        as: "bandas",
        required: false, // LEFT JOIN banda
      },
      {
        model: Musico,
        as: "musicos",
        required: false, // LEFT JOIN musico
        include: [
          { model: Instrumento, as: "instrumentos", required: false },
          { model: Localizacao, as: "localizacao", required: false },
        ],
      },
    ],
    where: {
      [Op.or]: [
        { "$bandas.cod_banda$": { [Op.not]: null } },

        literal(`
          "musicos"."nro_registro" IS NOT NULL
          AND NOT EXISTS (
            SELECT 1
              FROM musico_pertence_banda AS mpb
             WHERE mpb.nro_registro = "musicos"."nro_registro"
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
        as: "bandas",
      },
      {
        model: Musico,
        as: "musicos",
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

export { createArtista, getArtistaById, getArtistas, getDiscosByIdArtista };
