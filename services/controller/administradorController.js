import { Router } from "express";

import {
  createAdministrador,
  getAdministradorByEmail,
  loginAdministrador,
} from "../repository/administradorRepository.js";

const router = Router();

router.post("/administradores", async (req, res) => {
  const { email, nome, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios: nome, email, senha." });
  }

  try {
    const existente = await getAdministradorByEmail(email);
    if (existente) {
      return res
        .status(409)
        .json({ message: "Já existe um administrador com este email." });
    }

    const novoAdmin = await createAdministrador({ nome, email, senha });

    const { senha: _, ...dadosSeguros } = novoAdmin.get({ plain: true });

    return res.status(201).json({
      message: "Administrador criado com sucesso.",
      administrador: dadosSeguros,
    });
  } catch (err) {
    console.error(err);
    if (
      err.name === "SequelizeUniqueConstraintError" ||
      err.name === "SequelizeValidationError"
    ) {
      return res.status(409).json({ message: "Email já cadastrado." });
    }
    return res
      .status(500)
      .json({ message: "Erro interno ao criar administrador." });
  }
});

router.post("/administradores/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios: email, senha." });
  }

  try {
    const { admin, error } = await loginAdministrador(email, senha);

    if (error === "EMAIL_NAO_ENCONTRADO") {
      return res.status(404).json({ message: "Email não encontrado." });
    }
    if (error === "SENHA_INVALIDA") {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const { senha: _, ...dadosSeguros } = admin.get({ plain: true });

    return res
      .status(200)
      .json({ message: "Login bem-sucedido.", administrador: dadosSeguros });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno ao fazer login." });
  }
});

export default router;
