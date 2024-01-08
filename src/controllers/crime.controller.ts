import { Request, Response } from 'express';
import repository from '../database/prisma.repository';
import { CrimeModel } from '../models/crime.model';

export class CrimeController {

    // Criar um novo crime
  public async criarCrime(req: Request, res: Response) {
    try {
      const { descricao, dataCrime } = req.body;

      if (!descricao || !dataCrime) {
        return res.status(400).send({
          ok: false,
          message: 'Os campos obrigatórios não foram informados',
        });
      }

      const crime = new CrimeModel(descricao, dataCrime);

      const result = await repository.crime.create({
        data: {
          descricao: crime.descricao,
          data_crime: crime.dataCrime,
        },
      });

      return res.status(201).send({
        ok: true,
        message: 'Crime criado com sucesso',
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Obter um crime pelo ID
  public async obterCrime(req: Request, res: Response) {
    try {
      const { idCrime } = req.params;

      const crime = await repository.crime.findUnique({
        where: {
          id_crime: parseInt(idCrime, 10),
        },
      });

      if (!crime) {
        return res.status(404).send({
          ok: false,
          message: 'Crime não encontrado',
        });
      }

      return res.status(200).send({
        ok: true,
        message: 'Crime obtido com sucesso',
        data: crime,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Atualizar um crime
  public async atualizarCrime(req: Request, res: Response) {
    try {
      const { idCrime } = req.params;
      const { descricao, dataCrime } = req.body;

      if (!descricao && !dataCrime) {
        return res.status(400).send({
          ok: false,
          message: 'Informe ao menos um campo para atualizar',
        });
      }

      const crime = await repository.crime.findUnique({
        where: {
          id_crime: parseInt(idCrime, 10),
        },
      });

      if (!crime) {
        return res.status(404).send({
          ok: false,
          message: 'Crime não encontrado',
        });
      }

      const result = await repository.crime.update({
        where: {
          id_crime: parseInt(idCrime, 10),
        },
        data: {
          descricao: descricao || crime.descricao,
          data_crime: dataCrime || crime.data_crime,
        },
      });

      return res.status(200).send({
        ok: true,
        message: 'Crime atualizado com sucesso',
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Deletar um crime
  public async deletarCrime(req: Request, res: Response) {
    try {
      const { idCrime } = req.params;

      const crime = await repository.crime.findUnique({
        where: {
          id_crime: parseInt(idCrime, 10),
        },
      });

      if (!crime) {
        return res.status(404).send({
          ok: false,
          message: 'Crime não encontrado',
        });
      }

      await repository.crime.delete({
        where: {
          id_crime: parseInt(idCrime, 10),
        },
      });

      return res.status(200).send({
        ok: true,
        message: 'Crime deletado com sucesso',
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // Listar todos os crimes
  public async listarCrimes(req: Request, res: Response) {
    try {
      const crimes = await repository.crime.findMany();

      return res.status(200).send({
        ok: true,
        message: 'Crimes obtidos com sucesso',
        data: crimes,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
