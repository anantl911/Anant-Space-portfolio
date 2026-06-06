import type { Request, Response, NextFunction } from "express";
import { ProjectsService } from "./projects.service.js";

export const ProjectsController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const project = await ProjectsService.createProject(req.body);
            res.status(201).json({ success: true, data: project });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const project = await ProjectsService.getProjectById(req.params.id as string);
            res.json({ success: true, data: project });
        } catch (err) {
            next(err);
        }
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await ProjectsService.getAllProjects(req.query as any);
            res.json({ success: true, data: result });
        } catch (err) {
            next(err);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const project = await ProjectsService.updateProject(req.params.id as string, req.body);
            res.json({ success: true, data: project });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ProjectsService.deleteProject(req.params.id as string);
            res.json({ success: true, message: "Project deleted" });
        } catch (err) {
            next(err);
        }
    },
};
