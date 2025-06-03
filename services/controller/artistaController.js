import { Router } from "express";

import {
  getArtistaById,
  getArtistas,
  getDiscosByIdArtista
} from "../repository/artistaRepository.js";

const router = Router();

router.get("/artistas", async (req, res) => {
  try {
    const artistas = await getArtistas();

    if (!artistas || artistas.length === 0) {
      return res.status(404).json({ message: "Artistas não encontrados." });
    }

    return res.status(200).json(artistas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao buscar artistas." });
  }
});

router.get("/artistas/:id_artista", async (req, res) => {
  try {
    const artista = await getArtistaById(req.params.id_artista);

    if (!artista) {
      return res.status(404).json({
        message: `Artista com id_artista=${req.params.id_artista} não encontrado.`,
      });
    }

    return res.status(200).json(artista);
  } catch (err) {
    return res.status(500).json({
      message: `Erro ao buscar artista com id_artista=${req.params.id_artista}.`,
    });
  }
});

router.get("/artistas/:id_artista/discos", async (req, res) => {
  try {
    const artista = await getDiscosByIdArtista(req.params.id_artista);

    if (!artista) {
      return res.status(404).json({
        message: `Artista com id_artista=${req.params.id_artista} não encontrado.`,
      });
    }

    return res.status(200).json(artista);
  } catch (err) {
    return res.status(500).json({
      message: `Erro ao buscar discos do artista com id_artista=${req.params.id_artista}.`,
    });
  }
});

export default router;
