import { pgSequelize } from "../database/db.js";
import Administrador from "./administradorModel.js";
import Artista from "./artistaModel.js";
import ArtistaParticipaMusica from "./artistaParticipaMusicaModel.js";
import Banda from "./bandaModel.js";
import DiscoContemMusica from "./discoContemMusicaModel.js";
import Disco from "./discoModel.js";
import Instrumento from "./instrumentoModel.js";
import Localizacao from "./localizacaoModel.js";
import Musica from "./musicaModel.js";
import Musico from "./musicoModel.js";
import MusicoPertenceBanda from "./musicoPertenceBandaModel.js";
import MusicoTocaInstrumento from "./musicoTocaInstrumentoModel.js";
import Produtor from "./produtorModel.js";

const db = {
  pgSequelize,
  Administrador,
  Artista,
  ArtistaParticipaMusica,
  Banda,
  Disco,
  DiscoContemMusica,
  Instrumento,
  Localizacao,
  Musica,
  Musico,
  MusicoPertenceBanda,
  MusicoTocaInstrumento,
  Produtor,
};

Object.values(db).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(db);
  }
});

export default db;
