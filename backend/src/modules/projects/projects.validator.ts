import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import ApiError from "../../utils/ApiError.js";

const objectIdRegex = /^[a-f\d]{24}$/i;

const linksSchema = z.object({
    youtube: z.string().url().optional(),
    github: z.string().url().optional(),
    deployment: z.string().url().optional(),
    as_blog: z.string().optional(),
});

export const createProjectSchema = z.object({
    title: z.string().trim().min(1, "title is required"),
    description: z
        .array(z.string().min(10, "Description point should be at least 10 char long."))
        .min(1, "At least provide first point for description."),
    techTags: z.object({
        general: z.array(z.string().min(1, "Invalid tech tag for Frontend")).default([]),
        frontend: z.array(z.string().min(1, "Invalid tech tag for Frontend")).default([]),
        backend: z.array(z.string().min(1, "Invalid tech tag for Frontend")).default([]),
        database: z.array(z.string().min(1, "Invalid tech tag for Frontend")).default([]),
        desktop: z.array(z.string().min(1, "Invalid tech tag for Frontend")).default([]),
        others: z.array(z.string().min(1, "Invalid tech tag for Frontend")).default([]),
    }),
    designatedTag: z
        .object({
            tag: z.string(),
            description: z.string(),
        })
        .default({
            tag: "",
            description: "",
        }),
    links: linksSchema.default({}),
    visibleFor: z.array(z.string()).default([]),
    screenshots: z.array(z.string()).default([]),
    startedAt: z.coerce.date(),
    finishedAt: z.coerce.date(),
    priority: z.number().nonnegative(),
});

export const updateProjectSchema = createProjectSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, { message: "Update body cannot be empty" });

export const projectIdSchema = z.object({
    id: z.string().regex(objectIdRegex, "Invalid project ID"),
});

function validate(schema: z.ZodTypeAny, source: "body" | "params" | "query" = "body") {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            const errors = result.error.issues.map((e: { message: string }) => e.message);
            return next(new ApiError(400, "Validation failed", errors));
        }

        req[source] = result.data;
        next();
    };
}

export const ProjectValidator = {
    validateCreate: validate(createProjectSchema, "body"),
    validateUpdate: validate(updateProjectSchema, "body"),
    validateId: validate(projectIdSchema, "params"),
};

