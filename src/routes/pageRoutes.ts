import { Router } from "express";

export const pageRouter = Router()
pageRouter.get("/criar", (req, res) => res.render("criarProduto"))
pageRouter.get("/produtos", async (req, res) => {
    const result = await fetch("http://localhost:3000/api/")
    const link = await result.json()

    res.render("produtos", { link: link})
})
