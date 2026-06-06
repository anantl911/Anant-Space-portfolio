import express from "express";
import { ProjectsController } from "./projects.controller.js";
import { ProjectValidator } from "./projects.validator.js";

const router = express.Router();

router.post("/create", ProjectValidator.validateCreate, ProjectsController.create);
router.get("/list", ProjectsController.getAll);
router.get("/get/:id", ProjectValidator.validateId, ProjectsController.getById);
router.patch(
    "/update/:id",
    ProjectValidator.validateId,
    ProjectValidator.validateUpdate,
    ProjectsController.update,
);
router.delete("/delete/:id", ProjectValidator.validateId, ProjectsController.delete);

export default router;

