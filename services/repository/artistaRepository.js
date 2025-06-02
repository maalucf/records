import db from "../model/index.js";
const { Artista, Banda, Instrumento, Localizacao, Musico } = db;

async function getArtistas() {
  return await Artista.findAll({
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

export { getArtistaById, getArtistas };
