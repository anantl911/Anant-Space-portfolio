import Express from "express";
import projectRoutes from "./modules/projects/projects.routes.js";

const router = Express.Router();

router.use("/project", projectRoutes);

export default router;
