import { Router } from "express";

import {
  createDiscoComMusicas,
  getDiscoById,
  getDiscos,
  updateDiscoComMusicas,
} from "../repository/discoRepository.js";
import throwError from "./errors/error.js";

const router = Router();

router.get("/discos", async (req, res) => {
  try {
    const discos = await getDiscos();

    if (!discos || Object.keys(discos).length === 0) {
      return res.status(404).json({ message: "Discos não encontrados." });
    }

    return res.status(200).json(discos);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar discos." });
  }
});

router.get("/discos/:cod_disco", async (req, res) => {
  try {
    const disco = await getDiscoById(req.params.cod_disco);

    if (!disco) {
      return res.status(404).json({
        message: `Disco com cod_disco=${req.params.cod_disco} não encontrado.`,
      });
    }

    return res.status(200).json(disco);
  } catch (err) {
    return res.status(500).json({
      message: `Erro ao buscar disco com cod_disco=${req.params.cod_disco}.`,
    });
  }
});

router.post("/discos", async (req, res) => {
  try {
    const dados = req.body;

    const discoCriado = await createDiscoComMusicas(dados);

    return res.status(201).json(discoCriado);
  } catch (err) {
    throwError(err, res);
  }
});

router.put("/discos/:cod_disco", async (req, res) => {
  const { cod_disco } = req.params;
  const dados = req.body;

  try {
    const discoAtualizado = await updateDiscoComMusicas(
      Number(cod_disco),
      dados
    );
    return res.status(200).json({
      message: "Disco atualizado com sucesso.",
      disco: discoAtualizado,
    });
  } catch (err) {
    throwError(err, res);
  }
});

export default router;
