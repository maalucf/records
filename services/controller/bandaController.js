import { Router } from "express";

import {
  createBandaComMusicos,
  getBandaMusicos,
  updateBandaComMusicos,
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

router.put("/bandas/:cod_banda", async (req, res) => {
  const { cod_banda } = req.params;
  const dados = req.body;

  try {
    const bandaAtualizada = await updateBandaComMusicos(
      Number(cod_banda),
      dados
    );
    return res.status(200).json({
      message: "Banda atualizada com sucesso.",
      banda: bandaAtualizada,
    });
  } catch (err) {
    throwError(err, res);
  }
});

export default router;
