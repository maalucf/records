import { DataTypes, Model } from "sequelize";
import { pgSequelize } from "../database/db.js";

class Musica extends Model {
  static associate(models) {
    Musica.belongsToMany(models.Artista, {
      through: models.ArtistaParticipaMusica,
      foreignKey: "cod_musica",
      otherKey: "id_artista",
      as: "artistas",
    });

    Musica.belongsToMany(models.Disco, {
      through: models.DiscoContemMusica,
      foreignKey: "cod_musica",
      otherKey: "cod_disco",
      as: "discos",
    });
  }
}

Musica.init(
  {
    cod_musica: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Musica",
    tableName: "musica",
    timestamps: false,
  }
);

export default Musica;
