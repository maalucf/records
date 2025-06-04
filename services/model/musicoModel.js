import { DataTypes, Model } from "sequelize";

import { pgSequelize } from "../database/db.js";

class Musico extends Model {
  static associate(models) {
    Musico.belongsTo(models.Artista, {
      foreignKey: "id_artista",
      as: "artista",
    });

    Musico.belongsTo(models.Localizacao, {
      foreignKey: "id_localizacao",
      as: "localizacao",
    });

    Musico.belongsToMany(models.Banda, {
      through: models.MusicoPertenceBanda,
      foreignKey: "nro_registro",
      otherKey: "cod_banda",
      as: "bandas",
    });

    Musico.belongsToMany(models.Instrumento, {
      through: models.MusicoTocaInstrumento,
      foreignKey: "nro_registro",
      otherKey: "cod_instrumento",
      as: "instrumentos",
    });
  }
}

Musico.init(
  {
    nro_registro: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    id_artista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "artista", key: "id_artista" },
    },
    id_localizacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "localizacao", key: "id_localizacao" },
    },
  },
  {
    sequelize: pgSequelize,
    modelName: "Musico",
    tableName: "musico",
    timestamps: false,
    hooks: {
      beforeCreate: async (musico, opts) => {
        const Banda = musico.sequelize.models.Banda;
        const existeBanda = await Banda.findOne({
          where: { id_artista: musico.id_artista },
        });
        if (existeBanda) {
          throw new Error(
            `Não é possível criar Músico: o Artista ${musico.id_artista} já está cadastrado como Banda.`
          );
        }
      },
      beforeUpdate: async (musico, opts) => {
        if (musico.changed("id_artista")) {
          const Banda = musico.sequelize.models.Banda;
          const existeBanda = await Banda.findOne({
            where: { id_artista: musico.id_artista },
          });
          if (existeBanda) {
            throw new Error(
              `Não é possível alterar Músico: o Artista ${musico.id_artista} já está cadastrado como Banda.`
            );
          }
        }
      },
    },
  }
);

export default Musico;
