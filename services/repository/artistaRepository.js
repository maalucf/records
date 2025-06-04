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
