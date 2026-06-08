import Express from "express";
import projectRoutes from "./modules/projects/projects.routes.js";
import blogRoutes from "./modules/blogs/blogs.routes.js";
import uploadRoutes from "./modules/upload/upload.routes.js";

const router = Express.Router();

router.use("/project", projectRoutes);
router.use("/blog", blogRoutes);
router.use("/upload", uploadRoutes);

export default router;
