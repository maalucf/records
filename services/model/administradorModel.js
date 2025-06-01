import { DataTypes, Model } from "sequelize";
import { pgSequelize } from "../database/db.js";

class Administrador extends Model {
  static associate(models) {}
}

Administrador.init(
  {
    id_administrador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Administrador",
    tableName: "administrador",
    timestamps: false,
  }
);

export default Administrador;
