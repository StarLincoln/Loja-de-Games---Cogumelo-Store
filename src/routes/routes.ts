import { Router, Request, Response } from "express"
import { jsonRepositories } from "../repositories/jsonRepositories"
import { Produto } from "../entities/produto"

export const apiRouter = Router()
const repo = new jsonRepositories("./dados/produto.json")

apiRouter.get("/api/", async (req: Request, res: Response) => {
    try{
        const produtos = await repo.listarTodos()

        console.log(produtos);
        console.log(produtos.map(p => p.toJson()));

        res.json(produtos.map(p => p.toJson()))
    }catch(erro){
        res.status(500).json({erro: "Erro ao listar o Produto"})
    }
})
apiRouter.get("/api/:id", async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id)
        const produto = await repo.buscarPorId(id)

        res.json(produto)
    } catch(erro){
       res.status(404).json({ erro : "Erro ao buscar Produto"}) 
    }
})
apiRouter.post("/api/produtos", async (req: Request, res: Response) => {
    try{
        const produtos = await repo.listarTodos() || []
        const idMax = Number(produtos.reduce((max, num) => Math.max(max, num.id), 0)) + 1

        const {nome, preco, lancamento, plataforma, avaliacao} = req.body
        const add = new Produto(idMax, nome, preco, lancamento, plataforma, avaliacao)

        await repo.criarItem(add)
        res.status(201).json(add)
    }catch(erro){
        res.status(400).json({erro : "Erro ao criar produto"})
    }
})
apiRouter.put("/api/produtos/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const add = req.body

        await repo.atualizarItem(id, add)

        res.json({mensagem: "Produto Atualizado"})
    } catch (erro) {
        res.status(500).json({erro : "Não foi possível atualizar o produto"})
    }
})
apiRouter.delete("/api/produtos/:id", async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id)

        await repo.removerItem(id)

        res.json({mensagem: "Produto Removido"})
    }catch(erro){
        res.status(400).json({erro : "Não foi possível remover o produto"})
    }
})