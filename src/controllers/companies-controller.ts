import { Request, Response } from "express";
import { Company } from "../models";

export const companiesController = {
  index: async (req: Request, res: Response) => {
    try {
      const companies = await Company.findAll();

      return res.status(200).json(companies);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  save: async (req: Request, res: Response) => {
    try {
      const { name, bio, website, email } = req.body;

      const company = await Company.create({ name, bio, website, email });

      return res.status(200).json(company);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  show: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const company = await Company.findByPk(id, {include: 'jobs'});

      if (!company) {
        return res.status(404).send();
      }

      return res.status(200).json(company);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, bio, website, email } = req.body;

      const company = await Company.findByPk(id);

      if (!company) {
        res.status(404).send();
      }

      const [affectedRows, companies] = await Company.update(
        { name, bio, website, email },
        { where: { id }, returning: true }
      );

      return res.status(200).json(companies[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const company = await Company.findByPk(id);

      if (!company) {
        return res.status(404).send();
      }

      await Company.destroy({ where: { id } });

      return res.status(200).json(company);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
