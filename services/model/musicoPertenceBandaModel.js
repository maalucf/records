import { DataTypes, Model } from "sequelize";

import { pgSequelize } from "../database/db.js";

class MusicoPertenceBanda extends Model {
  static associate(models) {}
}

MusicoPertenceBanda.init(
  {
    nro_registro: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: { model: "musico", key: "nro_registro" },
    },
    cod_banda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: "banda", key: "cod_banda" },
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "MusicoPertenceBanda",
    tableName: "musico_pertence_banda",
    timestamps: false,
  }
);

export default MusicoPertenceBanda;
