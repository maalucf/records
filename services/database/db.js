import "dotenv/config";

import { Sequelize } from "sequelize";

export const pgSequelize = new Sequelize(process.env.CONNECTION_STRING, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
