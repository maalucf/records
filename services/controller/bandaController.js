import { Router } from "express";

import {
  createBandaComMusicos,
  getBandaMusicos,
} from "../repository/bandaRepository.js";
import throwError from "./errors/error.js";

const router = Router();

router.post("/bandas", async (req, res) => {
  const dadosBanda = req.body;

  if (!dadosBanda.nome) {
    return res.status(400).json({ message: "Campos obrigatórios: nome." });
  }

  try {
    const novaBanda = await createBandaComMusicos(dadosBanda);

    return res.status(201).json({
      message: "Banda criada com sucesso.",
      banda: novaBanda,
    });
  } catch (err) {
    console.error(err);

    throwError(err, res);
  }
});

router.get("/bandas/:cod_banda/musicos", async (req, res) => {
  const codBanda = req.params.cod_banda;
  try {
    const bandaMusicos = await getBandaMusicos(codBanda);

    if (!bandaMusicos) {
      return res.status(404).json({
        message: `Banda com cod_banda=${codBanda} não encontrada.`,
      });
    }

    return res.status(200).json(bandaMusicos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Erro ao buscar músicos da banda com cod_banda=${codBanda}.`,
    });
  }
});

export default router;
