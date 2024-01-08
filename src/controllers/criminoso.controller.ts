import { Request, Response } from "express";
import { camposNaoInformados, erroServidor } from "../util/response.helper";
import { CriminosoModel } from "../models/criminoso.model";
import repository from "../database/prisma.repository";


export class CrimonosoController {
    public async inserirCriminoso(req: Request, res: Response){
        try {

            const { nome, dataNascimento } = req.body;

            if(!nome || !dataNascimento ){
                return camposNaoInformados(res);
            }

            const newCriminoso = new CriminosoModel(
                nome,
                dataNascimento,
            )

            const result = await repository.criminoso.create({
                data: newCriminoso,
            })

            return res.status(201).send({
                ok: true,
                message: "Criminoso inserido com sucesso",
                data: result,
            });

        } catch(error: any){
            return erroServidor(res, error);
        } 
    }
}