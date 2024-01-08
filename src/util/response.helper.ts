import { Response } from "express";


export function erroServidor(res: Response, error: any) {
    return res.status(500).send({
        ok: false,
        message: error.toString(),
    });
}

export function camposNaoInformados(res: Response) {
    return res.status(400).send({
        ok: false,
        message: "Campos obrigatórios não informados",
    });
}