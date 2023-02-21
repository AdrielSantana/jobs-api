import express from "express";
import { candidatesController } from "./controllers/candidates-controller";
import { companiesController } from "./controllers/companies-controller";
import { jobsController } from "./controllers/jobs-controller";
const router = express.Router();

router.get("/canditates", candidatesController.index);
router.post("/canditates", candidatesController.save);
router.get("/canditates/:id", candidatesController.show);
router.put("/canditates/:id", candidatesController.update);
router.delete("/canditates/:id", candidatesController.delete);

router.get("/companies", companiesController.index);
router.post("/companies", companiesController.save);
router.get("/companies/:id", companiesController.show);
router.put("/companies/:id", companiesController.update);
router.delete("/companies/:id", companiesController.delete);

router.get("/jobs", jobsController.index);
router.post("/jobs", jobsController.save);
router.get("/jobs/:id", jobsController.show);
router.put("/jobs/:id", jobsController.update);
router.delete("/jobs/:id", jobsController.delete);

router.post("/jobs/:id/addCandidate", jobsController.addCandidate);
router.delete("/jobs/:id/removeCandidate", jobsController.removeCandidate);

export { router };
