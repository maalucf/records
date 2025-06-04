import { Router } from "express";

import { createOrFindMusico } from "../repository/musicoRepository.js";
import throwError from "./errors/error.js";

const router = Router();

router.post("/musicos", async (req, res) => {
  const dadosMusico = req.body;

  if (
    !dadosMusico.nome ||
    !dadosMusico.nro_registro ||
    !dadosMusico.localizacao
  ) {
    return res.status(400).json({
      message: "Campos obrigatórios: nome, nro_registro, localizacao.",
    });
  }

  try {
    const novoMusico = await createOrFindMusico(dadosMusico);

    return res.status(201).json({
      message: "Músico criado com sucesso.",
      musico: novoMusico,
    });
  } catch (err) {
    console.error(err);

    throwError(err, res);
  }
});

export default router;
