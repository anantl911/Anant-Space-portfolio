import express from "express";
import { BlogsController } from "./blogs.controller.js";
import { BlogValidator } from "./blogs.validator.js";

const router = express.Router();

router.post("/create", BlogValidator.validateCreate, BlogsController.create);
router.get("/list", BlogsController.getAll);
router.get("/get/:id", BlogValidator.validateId, BlogsController.getById);
router.get("/slug/:slug", BlogValidator.validateSlug, BlogsController.getBySlug);
router.patch(
    "/update/:id",
    BlogValidator.validateId,
    BlogValidator.validateUpdate,
    BlogsController.update,
);
router.delete("/delete/:id", BlogValidator.validateId, BlogsController.delete);

export default router;
