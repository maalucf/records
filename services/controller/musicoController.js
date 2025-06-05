import { Router } from "express";

import {
  createOrFindMusico,
  updateMusico,
} from "../repository/musicoRepository.js";
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
    throwError(err, res);
  }
});

router.put("/musicos/:nro_registro", async (req, res) => {
  const { nro_registro } = req.params;
  const dadosMusico = req.body;

  if (!nro_registro || !dadosMusico) {
    return res.status(400).json({
      message: "Campos obrigatórios: nro_registro e dados do músico.",
    });
  }

  try {
    const musicoAtualizado = await updateMusico(nro_registro, dadosMusico);

    return res.status(200).json({
      message: "Músico atualizado com sucesso.",
      musico: musicoAtualizado,
    });
  } catch (err) {
    throwError(err, res);
  }
});

export default router;
