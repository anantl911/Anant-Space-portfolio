import type { Request, Response, NextFunction } from "express";
import { UploadService } from "./upload.service.js";
import ApiError from "../../utils/ApiError.js";

export const UploadController = {
    image: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                throw new ApiError(400, "No image file provided", null);
            }

            const result = await UploadService.uploadImage(req.file);
            res.status(201).json({ success: true, data: result });
        } catch (err) {
            next(err);
        }
    },
};
