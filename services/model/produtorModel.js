import { DataTypes, Model } from "sequelize";

import { pgSequelize } from "../database/db.js";

class Produtor extends Model {
  static associate(models) {
    Produtor.hasMany(models.Disco, {
      foreignKey: "cod_produtor",
      as: "discos",
    });
  }
}

Produtor.init(
  {
    cod_produtor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Produtor",
    tableName: "produtor",
    timestamps: false,
  }
);

export default Produtor;
