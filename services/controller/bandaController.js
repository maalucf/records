import { Router } from "express";

import { createBandaComMusicos } from "../repository/bandaRepository.js";

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

    return res.status(500).json({ message: "Erro interno ao criar banda." });
  }
});

export default router;
