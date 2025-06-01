import { DataTypes, Model } from "sequelize";

import { pgSequelize } from "../database/db.js";

class Instrumento extends Model {
  static associate(models) {
    Instrumento.belongsToMany(models.Musico, {
      through: models.MusicoTocaInstrumento,
      foreignKey: "cod_instrumento",
      otherKey: "nro_registro",
      as: "musicos",
    });
  }
}

Instrumento.init(
  {
    cod_instrumento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Instrumento",
    tableName: "instrumento",
    timestamps: false,
  }
);

export default Instrumento;
