import type { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";

async function ErrorHandler(err: ApiError | Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.json({
            success: false,
            message: err.message,
            details: err?.details ?? null,
        });
    }

    console.error("[Unhandled Error]: ", err?.message);
    return res.json({
        success: false,
        message: "Internal server error",
    });
}

export default ErrorHandler;
