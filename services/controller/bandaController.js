import { Router } from "express";

import {
  createBandaComMusicos,
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

router.put("/bandas/:id_artista", async (req, res) => {
  const { id_artista } = req.params;
  const dados = req.body;

  try {
    const bandaAtualizada = await updateBandaComMusicos(
      Number(id_artista),
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
