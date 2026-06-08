import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import validate from "../../middlewares/validation.middleware.js";
import { objectIdRegex } from "../../utils/ModuleUtils.js";

export const createBlogSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    author: z.string().trim().min(1, "Author is required"),
    content: z.record(z.string(), z.any()).refine(
        (val) => Object.keys(val).length > 0,
        "Content cannot be empty",
    ),
    tags: z.array(z.string().min(1, "Invalid tag")).default([]),
    heroPicture: z.string().default(""),
    visibleFor: z.array(z.string()).default([]),
});

export const updateBlogSchema = createBlogSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, { message: "Update body cannot be empty" });

export const blogIdSchema = z.object({
    id: z.string().regex(objectIdRegex, "Invalid blog ID"),
});

export const blogSlugSchema = z.object({
    slug: z.string().trim().min(1, "Slug is required"),
});

export const BlogValidator = {
    validateCreate: validate(createBlogSchema, "body"),
    validateUpdate: validate(updateBlogSchema, "body"),
    validateId: validate(blogIdSchema, "params"),
    validateSlug: validate(blogSlugSchema, "params"),
};
