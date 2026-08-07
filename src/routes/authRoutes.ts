import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Usuario } from "../entities/usuario";
import { UsuarioRepository } from "../models/usuarioRepositories";

export const authRouter = Router();

const repository = new UsuarioRepository();


authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios",
      });
    }

    const usuarioExistente = await repository.buscarPorEmail(email);

    if (usuarioExistente) {
      return res.status(409).json({
        erro: "Email já cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await repository.criar(email, senhaHash);

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro interno",
    });
  }
});
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await repository.buscarPorEmail(email);

    if (!usuario) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    req.session.usuarioId = usuario.id;

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro interno",
    });
  }
});
authRouter.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        erro: "Não foi possível sair",
      });
    }

    return res.json({
      mensagem: "Logout realizado",
    });
  });
});
