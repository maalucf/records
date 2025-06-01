import { DataTypes, Model } from "sequelize";
import { pgSequelize } from "../database/db.js";

class DiscoContemMusica extends Model {
  static associate(models) {}
}

DiscoContemMusica.init(
  {
    cod_disco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "disco", key: "cod_disco" },
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
    modelName: "DiscoContemMusica",
    tableName: "disco_contem_musica",
    timestamps: false,
  }
);

export default DiscoContemMusica;
