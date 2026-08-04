import { Request, Response, NextFunction } from "express";

export function auth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.session.usuarioId) {
        return res.status(401).json({
            erro: "Você precisa estar logado"
        });
    }

    next();
}