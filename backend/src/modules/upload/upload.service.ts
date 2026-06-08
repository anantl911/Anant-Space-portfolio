import ApiError from "../../utils/ApiError.js";
import { CLOUDINARY } from "../../lib/cloudinary/config.js";
import { generateSignature } from "../../utils/ModuleUtils.js";



export const UploadService = {
    uploadImage: async (file: Express.Multer.File) => {
        if (!CLOUDINARY.CLOUD_NAME || !CLOUDINARY.API_KEY || !CLOUDINARY.API_SECRET) {
            throw new ApiError(500, "Cloudinary credentials not configured", null);
        }

        const timestamp = Math.floor(Date.now() / 1000).toString();

        const params: Record<string, string> = {
            folder: CLOUDINARY.UPLOAD_DIRECTORY,
            timestamp,
        };

        const signature = generateSignature(params);

        const formData = new FormData();
        formData.append("file", new Blob([new Uint8Array(file.buffer)]), file.originalname);
        formData.append("api_key", CLOUDINARY.API_KEY);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", CLOUDINARY.UPLOAD_DIRECTORY);

        // TODO: Decide if this needs to be changed by JSON.
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData },
        );

        if (!response.ok) {
            const error = await response.json();
            throw new ApiError(502, "Image upload failed", error);
        }

        const result = (await response.json()) as {
            secure_url: string;
            public_id: string;
            width: number;
            height: number;
            format: string;
            bytes: number;
        };

        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            size: result.bytes,
        };
    },
};
