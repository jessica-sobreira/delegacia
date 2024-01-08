import express from "express";
import { CriminosoController } from "./controllers/criminoso.controller";

const app = express();
app.use(express.json());

const criminosoController = new CriminosoController();

app.post("/inserirCriminoso", criminosoController.inserirCriminoso);
app.get("/obterCriminoso/:id", criminosoController.obterCriminoso);
app.put("/atualizarCriminoso/:id", criminosoController.atualizarCriminoso);
app.delete("/deletarCriminoso/:id", criminosoController.deletarCriminoso);
app.get("/listarCriminosos", criminosoController.listarCriminosos);


app.listen(3001, () => {
    console.log("API está rodando!");
    
});
