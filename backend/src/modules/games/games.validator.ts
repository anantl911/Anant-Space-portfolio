import { z } from "zod";
import validate from "../../middlewares/validation.middleware.js";
import { objectIdRegex } from "../../utils/ModuleUtils.js";

export const addGameSchema = z.object({
    title: z.string().trim().min(3, "Title should be at least 3 characters."),
    description: z.string().trim().min(18, "Description should be at least 18 characters."),
    author: z.string().trim().min(6, "Author name should be at least 6 characters"),
    engine: z.enum(["godot", "phaser", "pixijs", "unity", "other"]),
    thumbnail: z.string().nonempty()
}).strict();

export const finalizeGameSchema = z.object({
    cdnUrl: z.string().nonempty("CDN URL is required.")
}).strict();

export const decideGameSchema = z.object({
    decision: z.enum(["ACCEPTED", "REJECTED"]),
    rejectionReason: z.string().optional()
}).strict();

export const gameIdParamsSchema = z.object({
    id: z.string().regex(objectIdRegex, "Invalid game ID")
});

export const gameSlugParamsSchema = z.object({
    slug: z.string().trim().min(1, "Slug is required")
});

export const cleanStatusSchema = z.object({
    status: z.enum(["UPLOADING", "REJECTED"])
});

export const GamesValidator = {
    validateAdd: validate(addGameSchema, "body"),
    validateFinalize: validate(finalizeGameSchema, "body"),
    validateId: validate(gameIdParamsSchema, "params"),
    validateSlug: validate(gameSlugParamsSchema, "params"),
    validateDecide: validate(decideGameSchema, "body"),
    validateClean: validate(cleanStatusSchema, "params")
};