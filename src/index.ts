import express from "express";
import { CriminosoController } from "./controllers/criminoso.controller";
import { CrimeController } from "./controllers/crime.controller";
import { ArmaController } from "./controllers/arma.controller";

const app = express();
app.use(express.json());

const criminosoController = new CriminosoController();
const crimeController = new CrimeController();
const armaController = new ArmaController();

app.post("/inserirCriminoso", criminosoController.inserirCriminoso);
app.get("/obterCriminoso/:id", criminosoController.obterCriminoso);
app.put("/atualizarCriminoso/:id", criminosoController.atualizarCriminoso);
app.delete("/deletarCriminoso/:id", criminosoController.deletarCriminoso);
app.get("/listarCriminosos", criminosoController.listarCriminosos);

app.post("/inserirCrime", crimeController.criarCrime);
app.get("/obterCrime/:id", crimeController.obterCrime);
app.put("/atualizarCrime/:id", crimeController.atualizarCrime);
app.delete("/deletarCrime/:id", crimeController.deletarCrime);
app.get("/listarCrimes", crimeController.listarCrimes);

app.post("/inserirArma", armaController.criarArma);
app.get("/obterArma/:id", armaController.obterArma);
app.put("/atualizarArma/:id", armaController.atualizarArma);
app.delete("/deletarArma/:id", armaController.deletarArma);
app.get("/listarArmas", armaController.listarArmas);


app.listen(3001, () => {
    console.log("API está rodando!");
    
});
