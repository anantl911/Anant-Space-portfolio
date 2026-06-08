import type z from "zod";
import ApiError from "../utils/ApiError.js";
import type { NextFunction, Request, Response } from "express";

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

export default validate;