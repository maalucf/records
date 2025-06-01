import { DataTypes, Model } from "sequelize";
import { pgSequelize } from "../database/db.js";

class Banda extends Model {
  static associate(models) {
    Banda.belongsTo(models.Artista, {
      foreignKey: "id_artista",
      as: "artista",
    });

    Banda.belongsToMany(models.Musico, {
      through: models.MusicoPertenceBanda,
      foreignKey: "cod_banda",
      otherKey: "nro_registro",
      as: "musicos",
    });
  }
}

Banda.init(
  {
    cod_banda: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_artista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "artista", key: "id_artista" },
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Banda",
    tableName: "banda",
    timestamps: false,
  }
);

export default Banda;
