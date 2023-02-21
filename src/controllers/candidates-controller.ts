import { Request, Response } from "express";
import { Candidate } from "../models";

export const candidatesController = {
  //GET /candidates
  index: async (req: Request, res: Response) => {
    try {
      const candidates = await Candidate.findAll();
      return res.status(200).json(candidates);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //POST /candidates
  save: async (req: Request, res: Response) => {
    const { name, bio, email, phone, openToWork } = req.body;

    try {
      const candidate = await Candidate.create({
        name,
        bio,
        email,
        phone,
        openToWork,
      });

      return res.status(201).json(candidate);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //GET /candidates/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const candidate = await Candidate.findByPk(id, { include: "jobs" });
      if (!candidate) {
        return res.status(404).send();
      }
      return res.status(200).json(candidate);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //PUT /candidates/:id
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, email, phone, openToWork } = req.body;

    try {
      //   const candidate = await Candidate.findByPk(id);
      //   if (!candidate) {
      //     return res.status(404).json({ message: "Candidato não encontrado" });
      //   }

      //   candidate.name = name;
      //   candidate.bio = bio;
      //   candidate.email = email;
      //   candidate.phone = phone;
      //   candidate.openToWork = openToWork;

      //   await candidate.save();

      const candidate = await Candidate.findByPk(id);
      if (!candidate) {
        return res.status(404).send();
      }

      await Candidate.update(
        { name, bio, email, phone, openToWork },
        { where: { id } }
      );

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const candidate = await Candidate.findByPk(id);
      if (!candidate) {
        return res.status(404).send();
      }

      await Candidate.destroy({ where: { id } });

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
