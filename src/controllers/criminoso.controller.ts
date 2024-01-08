import { Request, Response } from 'express';
import repository from '../database/prisma.repository';
import { CriminosoModel } from '../models/criminoso.model';
import { erroServidor } from '../util/response.helper';


export class CriminosoController {

    // Criar um novo criminoso
  public async inserirCriminoso(req: Request, res: Response) {
    try {
      const { nome, dataNascimento } = req.body;

      if (!nome || !dataNascimento) {
        return res.status(400).send({
          ok: false,
          message: 'Os campos obrigatórios não foram informados',
        });
      }

      const criminoso = new CriminosoModel(nome, dataNascimento);

      const result = await repository.criminoso.create({
        data: {
          nome: criminoso.nome,
          data_nascimento: criminoso.dataNascimento,
        },
        select: {
          id_criminoso: true,
          nome: true,
          data_nascimento: true,
        }

      });

      return res.status(201).send({
        ok: true,
        message: 'Criminoso criado com sucesso',
        data: result,
      });

    } catch (error: any) {
      return erroServidor(res, error);
    }
  }

  // Obter um criminoso pelo ID
  public async obterCriminoso(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const criminoso = await repository.criminoso.findUnique({
        where: {
          id_criminoso: parseInt(id, 10),
        },
      });

      if (!criminoso) {
        return res.status(404).send({
          ok: false,
          message: 'Criminoso não encontrado',
        });
      }

      return res.status(200).send({
        ok: true,
        message: 'Criminoso obtido com sucesso',
        data: criminoso,
      });
    } catch (error: any) {
      return erroServidor(res, error);
    }
  }

  // Atualizar um criminoso
  public async atualizarCriminoso(req: Request, res: Response) {
    try {
      const { idCriminoso } = req.params;
      const { nome, dataNascimento } = req.body;

      if (!nome && !dataNascimento) {
        return res.status(400).send({
          ok: false,
          message: 'Informe ao menos um campo para atualizar',
        });
      }

      const criminoso = await repository.criminoso.findUnique({
        where: {
          id_criminoso: parseInt(idCriminoso, 10),
        },
      });

      if (!criminoso) {
        return res.status(404).send({
          ok: false,
          message: 'Criminoso não encontrado',
        });
      }

      const result = await repository.criminoso.update({
        where: {
          id_criminoso: parseInt(idCriminoso, 10),
        },
        data: {
          nome: nome || criminoso.nome,
          data_nascimento: dataNascimento || criminoso.data_nascimento,
        },
      });

      return res.status(200).send({
        ok: true,
        message: 'Criminoso atualizado com sucesso',
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Deletar um criminoso
  public async deletarCriminoso(req: Request, res: Response) {
    try {
      const { idCriminoso } = req.params;

      const criminoso = await repository.criminoso.findUnique({
        where: {
          id_criminoso: parseInt(idCriminoso, 10),
        },
      });

      if (!criminoso) {
        return res.status(404).send({
          ok: false,
          message: 'Criminoso não encontrado',
        });
      }

      await repository.criminoso.delete({
        where: {
          id_criminoso: parseInt(idCriminoso, 10),
        },
      });

      return res.status(200).send({
        ok: true,
        message: 'Criminoso deletado com sucesso',
      });
    } catch (error: any) {
      return erroServidor(res, error);
    }
  }

  // Listar todos os criminosos
  public async listarCriminosos(req: Request, res: Response) {
    try {
      const criminosos = await repository.criminoso.findMany();
      return res.status(200).send({
        ok: true,
        message: 'Criminosos obtidos com sucesso',
        data: criminosos,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });      
    }
  }
}
