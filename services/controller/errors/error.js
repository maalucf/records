function throwError(err, res) {
  if (err.name === "SequelizeUniqueConstraintError") {
    const campos = err.errors.map((e) => e.path).join(", ");
    return res.status(409).json({
      message: `Violação de unicidade: registro duplicado no(s) campo(s): ${campos}.`,
      detalhes: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Falha na validação de dados do modelo.",
      detalhes: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      message: `Chave estrangeira inválida: ${
        err.index || err.fields || err.table
      }.`,
      detalhes: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Erro interno ao criar músico." });
}

export default throwError;
