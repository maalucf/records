import { DataTypes, Model } from "sequelize";

import { pgSequelize } from "../database/db.js";

class Disco extends Model {
  static associate(models) {
    Disco.belongsTo(models.Artista, {
      foreignKey: "id_artista",
      as: "artista",
    });

    Disco.belongsTo(models.Produtor, {
      foreignKey: "cod_produtor",
      as: "produtor",
    });

    Disco.belongsToMany(models.Musica, {
      through: models.DiscoContemMusica,
      foreignKey: "cod_disco",
      otherKey: "cod_musica",
      as: "musicas",
    });
  }
}

Disco.init(
  {
    cod_disco: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    formato: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    id_artista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "artista", key: "id_artista" },
    },
    cod_produtor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "produtor", key: "cod_produtor" },
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Disco",
    tableName: "disco",
    timestamps: false,
  }
);

export default Disco;
