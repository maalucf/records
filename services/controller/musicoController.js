import { Router } from "express";

import {
  createOrFindMusico,
  updateMusico,
} from "../repository/musicoRepository.js";
import throwError from "./errors/error.js";

const router = Router();

router.post("/musicos", async (req, res) => {
  const dadosMusico = req.body;

  if (!dadosMusico.nome || !dadosMusico.localizacao) {
    return res.status(400).json({
      message: "Campos obrigatórios: nome, localizacao.",
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

router.put("/musicos/:id_artista", async (req, res) => {
  const { id_artista } = req.params;
  const dadosMusico = req.body;

  if (!id_artista || !dadosMusico) {
    return res.status(400).json({
      message: "Campos obrigatórios: id_artista e dados do músico.",
    });
  }

  try {
    const musicoAtualizado = await updateMusico(id_artista, dadosMusico);

    return res.status(200).json({
      message: "Músico atualizado com sucesso.",
      musico: musicoAtualizado,
    });
  } catch (err) {
    throwError(err, res);
  }
});

export default router;
