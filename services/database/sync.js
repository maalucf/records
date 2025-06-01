import db from "../model/index.js";

try {
  await db.pgSequelize.sync({ force: true });
  console.log("Tabelas sincronizadas com sucesso!");
  process.exit(0);
} catch (error) {
  console.error("Erro ao sincronizar tabelas:", error);
  process.exit(1);
}
