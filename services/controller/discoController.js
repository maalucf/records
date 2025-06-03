import { Router } from "express";

import { getDiscoById, getDiscos } from "../repository/discoRepository.js";

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

export default router;
