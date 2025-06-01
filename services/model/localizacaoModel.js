import { DataTypes, Model } from "sequelize";
import { pgSequelize } from "../database/db.js";

class Localizacao extends Model {
  static associate(models) {
    Localizacao.hasMany(models.Musico, {
      foreignKey: "id_localizacao",
      as: "musicos",
    });
  }
}

Localizacao.init(
  {
    id_localizacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Localizacao",
    tableName: "localizacao",
    timestamps: false,
  }
);

export default Localizacao;
