import { Request, Response } from "express";
import { Candidate, Job } from "../models";

export const jobsController = {
  //GET /jobs
  index: async (req: Request, res: Response) => {
    try {
      const jobs = await Job.findAll({ include: "company" });

      return res.status(200).json(jobs);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //POST /jobs
  save: async (req: Request, res: Response) => {
    const { title, description, limitDate, companyId } = req.body;

    try {
      const job = await Job.create({
        title,
        description,
        limitDate,
        companyId,
      });

      return res.status(201).json(job);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //GET /jobs/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const job = await Job.findByPk(id, {
        include: ["company", "candidates"],
      });

      if (!job) {
        return res.status(404).send();
      }

      const candidateCount = await job.countCandidates();

      return res.status(200).json({ ...job.get(), candidateCount });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //PUT /jobs/:id
  update: async (req: Request, res: Response) => {
    const { title, description, limitDate, companyId } = req.body;
    const { id } = req.params;

    try {
      const [affectedRows, jobs] = await Job.update(
        {
          title,
          description,
          limitDate,
          companyId,
        },
        { where: { id }, returning: true }
      );

      return res.status(200).json(jobs[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //DELETE /jobs/:id
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const job = await Job.findByPk(id, { include: "company" });

      if (!job) {
        return res.status(404).send();
      }

      await Job.destroy({ where: { id } });

      return res.status(200).json(job);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //POST /jobs/:id/addCandidate
  addCandidate: async (req: Request, res: Response) => {
    const jobId = req.params.id;
    const { candidateId } = req.body;

    try {
      const job = await Job.findByPk(jobId);
      const candidate = await Candidate.findByPk(candidateId);

      if (!job || !candidate) {
        return res.status(404).send();
      }

      await job.addCandidate(candidateId);

      return res.status(201).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //DELETE /jobs/:id/removeCandidate
  removeCandidate: async (req: Request, res: Response) => {
    const jobId = req.params.id;
    const { candidateId } = req.body;

    try {
      const job = await Job.findByPk(jobId);
      const candidate = await Candidate.findByPk(candidateId);

      if (!job || !candidate) {
        return res.status(404).send();
      }

      await job.removeCandidate(candidateId);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
