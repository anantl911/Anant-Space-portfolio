import express from "express";
import multer from "multer";
import { UploadController } from "./upload.controller.js";
import ApiError from "../../utils/ApiError.js";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_SIZE },
    fileFilter: (_req, file, cb) => {
        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            return cb(new ApiError(400, "Only JPEG, PNG, WebP, and GIF images are allowed", null));
        }
        cb(null, true);
    },
});

const router = express.Router();

router.post("/image", upload.single("image"), UploadController.image);

export default router;
