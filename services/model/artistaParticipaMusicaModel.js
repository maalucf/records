import { DataTypes, Model } from "sequelize";

import { pgSequelize } from "../database/db.js";

class ArtistaParticipaMusica extends Model {
  static associate(models) {}
}

ArtistaParticipaMusica.init(
  {
    id_artista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "artista", key: "id_artista" },
    },
    cod_musica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "musica", key: "cod_musica" },
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "ArtistaParticipaMusica",
    tableName: "artista_participa_musica",
    timestamps: false,
  }
);

export default ArtistaParticipaMusica;
