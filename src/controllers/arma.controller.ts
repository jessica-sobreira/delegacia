
import { Request, Response } from 'express';
import repository from '../database/prisma.repository';
import { ArmaModel } from '../models/arma.model';

export class ArmaController {

    // Criar uma nova arma
  public async criarArma(req: Request, res: Response) {
    try {
      const { tipo, serie } = req.body;

      if (!tipo || !serie) {
        return res.status(400).send({
          ok: false,
          message: 'Os campos obrigatórios não foram informados',
        });
      }

      const arma = new ArmaModel(tipo, serie);

      const result = await repository.arma.create({
        data: {
          tipo: arma.tipo,
          numero_serie: arma.serie,
        },
      });

      return res.status(201).send({
        ok: true,
        message: 'Arma criada com sucesso',
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Obter uma arma pelo ID
  public async obterArma(req: Request, res: Response) {
    try {
      const { idArma } = req.params;

      const arma = await repository.arma.findUnique({
        where: {
          id_arma: parseInt(idArma, 10),
        },
      });

      if (!arma) {
        return res.status(404).send({
          ok: false,
          message: 'Arma não encontrada',
        });
      }

      return res.status(200).send({
        ok: true,
        message: 'Arma obtida com sucesso',
        data: arma,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Atualizar uma arma
  public async atualizarArma(req: Request, res: Response) {
    try {
      const { idArma } = req.params;
      const { tipo, serie } = req.body;

      if (!tipo && !serie) {
        return res.status(400).send({
          ok: false,
          message: 'Informe ao menos um campo para atualizar',
        });
      }

      const arma = await repository.arma.findUnique({
        where: {
          id_arma: parseInt(idArma, 10),
        },
      });

      if (!arma) {
        return res.status(404).send({
          ok: false,
          message: 'Arma não encontrada',
        });
      }

      const result = await repository.arma.update({
        where: {
          id_arma: parseInt(idArma, 10),
        },
        data: {
          tipo: tipo || arma.tipo,
          numero_serie: serie || arma.numero_serie,
        },
      });

      return res.status(200).send({
        ok: true,
        message: 'Arma atualizada com sucesso',
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Deletar uma arma
  public async deletarArma(req: Request, res: Response) {
    try {
      const { idArma } = req.params;

      const arma = await repository.arma.findUnique({
        where: {
          id_arma: parseInt(idArma, 10),
        },
      });

      if (!arma) {
        return res.status(404).send({
          ok: false,
          message: 'Arma não encontrada',
        });
      }

      await repository.arma.delete({
        where: {
          id_arma: parseInt(idArma, 10),
        },
      });

      return res.status(200).send({
        ok: true,
        message: 'Arma deletada com sucesso',
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Listar todas as armas
  public async listarArmas(req: Request, res: Response) {
    try {
      const armas = await repository.arma.findMany();

      return res.status(200).send({
        ok: true,
        message: 'Armas obtidas com sucesso',
        data: armas,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
