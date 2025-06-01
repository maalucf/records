import { DataTypes, Model } from "sequelize";

import { pgSequelize } from "../database/db.js";

class MusicoTocaInstrumento extends Model {
  static associate(models) {}
}

MusicoTocaInstrumento.init(
  {
    nro_registro: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: { model: "musico", key: "nro_registro" },
    },
    cod_instrumento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "instrumento", key: "cod_instrumento" },
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "MusicoTocaInstrumento",
    tableName: "musico_toca_instrumento",
    timestamps: false,
  }
);

export default MusicoTocaInstrumento;
