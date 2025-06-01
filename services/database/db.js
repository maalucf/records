import { Pool } from "pg";
import "dotenv/config";

export const pgPool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});
