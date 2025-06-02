import db from "../model/index.js";
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

async function getDiscoByArtista(id_artista) {
  return await Disco.findAll({
    where: { id_artista },
    include: [
      { model: Musica, as: "musicas" },
      { model: Produtor, as: "produtor" },
    ],
  });
}

export { getDiscoByArtista, getDiscoById, getDiscos };
