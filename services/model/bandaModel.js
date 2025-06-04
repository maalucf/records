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
    hooks: {
      beforeCreate: async (banda, opts) => {
        const Musico = banda.sequelize.models.Musico;
        const existeMusico = await Musico.findOne({
          where: { id_artista: banda.id_artista },
        });
        if (existeMusico) {
          throw new Error(
            `Não é possível criar Banda: o Artista ${banda.id_artista} já está cadastrado como Músico.`
          );
        }
      },
      beforeUpdate: async (banda, opts) => {
        if (banda.changed("id_artista")) {
          const Musico = banda.sequelize.models.Musico;
          const existeMusico = await Musico.findOne({
            where: { id_artista: banda.id_artista },
          });
          if (existeMusico) {
            throw new Error(
              `Não é possível alterar Banda: o Artista ${banda.id_artista} já está cadastrado como Músico.`
            );
          }
        }
      },
    },
  }
);

export default Banda;
