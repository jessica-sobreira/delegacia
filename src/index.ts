import express from "express";
import { CrimonosoController } from "./controllers/criminoso.controller";

const app = express();
app.use(express.json());

const criminosoController = new CrimonosoController();

// Rotas
// http://localhost:3001/inserirCriminoso
//CREATE
app.post("/inserirCriminoso", criminosoController.inserirCriminoso);

app.listen(3001, () => {
    console.log("API está rodando!");
    
});
