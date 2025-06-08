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
  const artistaModel = await Artista.findByPk(id_artista, {
    include: [
      {
        model: Banda,
        as: "banda",
        include: [
          {
            model: Musico,
            as: "musicos",
            attributes: ["id_artista"],
            include: [
              {
                model: Artista,
                as: "artista",
                attributes: ["nome", "url_imagem"],
              },
            ],
            through: { attributes: [] },
          },
        ],
      },
      {
        model: Musico,
        as: "musico",
        include: [
          { model: Instrumento, as: "instrumentos" },
          { model: Localizacao, as: "localizacao" },
          {
            model: Banda,
            as: "bandas",
            required: false,
            attributes: ["id_artista"],
            include: [
              {
                model: Artista,
                as: "artista",
                attributes: ["nome"],
              },
            ],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  if (!artistaModel) {
    return null;
  }

  const artista = artistaModel.get({ plain: true });

  if (artista.banda) {
    artista.banda.musicos = artista.banda.musicos.map((m) => ({
      id_artista: m.id_artista,
      nome: m.artista.nome,
      url_imagem: m.artista.url_imagem,
    }));
  } else {
    artista.musico.bandas = artista.musico.bandas.map((b) => ({
      id_artista: b.id_artista,
      nome: b.artista.nome,
    }));

    artista.musico.instrumentos = artista.musico.instrumentos.map((i) => ({
      cod_instrumento: i.cod_instrumento,
      nome: i.nome,
    }));
  }

  return artista;
}

async function getDiscosByIdArtista(id_artista) {
  return Artista.findByPk(id_artista, {
    include: [
      {
        model: Disco,
        as: "discos",
        include: [
          {
            model: Musica,
            as: "musicas",
            through: { attributes: [] },
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
