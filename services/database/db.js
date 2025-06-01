import "dotenv/config";
import { Sequelize } from "sequelize";

export const pgSequelize = new Sequelize(process.env.CONNECTION_STRING);
