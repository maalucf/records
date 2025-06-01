import { DataTypes, Model } from "sequelize";

import { pgSequelize } from "../database/db.js";

class Artista extends Model {
  static associate(models) {
    Artista.hasMany(models.Musico, {
      foreignKey: "id_artista",
      as: "musicos",
    });

    Artista.hasMany(models.Banda, {
      foreignKey: "id_artista",
      as: "bandas",
    });

    Artista.hasMany(models.Disco, {
      foreignKey: "id_artista",
      as: "discos",
    });

    Artista.belongsToMany(models.Musica, {
      through: models.ArtistaParticipaMusica,
      foreignKey: "id_artista",
      otherKey: "cod_musica",
      as: "musicas",
    });
  }
}

Artista.init(
  {
    id_artista: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    generos_musicais: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    url_imagem: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Artista",
    tableName: "artista",
    timestamps: false,
  }
);

export default Artista;
