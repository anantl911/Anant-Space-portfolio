import type { Request, Response, NextFunction } from "express";
import { BlogsService } from "./blogs.service.js";

export const BlogsController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const blog = await BlogsService.createBlog(req.body);
            res.status(201).json({ success: true, data: blog });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const blog = await BlogsService.getBlogById(req.params.id as string);
            res.json({ success: true, data: blog });
        } catch (err) {
            next(err);
        }
    },

    getBySlug: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const blog = await BlogsService.getBlogBySlug(req.params.slug as string);
            res.json({ success: true, data: blog });
        } catch (err) {
            next(err);
        }
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await BlogsService.getAllBlogs(req.query as any);
            res.json({ success: true, data: result });
        } catch (err) {
            next(err);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const blog = await BlogsService.updateBlog(req.params.id as string, req.body);
            res.json({ success: true, data: blog });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await BlogsService.deleteBlog(req.params.id as string);
            res.json({ success: true, data: { message: "Blog deleted" } });
        } catch (err) {
            next(err);
        }
    },
};
