import crypto from "crypto"
import { CLOUDINARY } from "../lib/cloudinary/config.js";

export function generateSignature(params: Record<string, string>): string {
    const sorted = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join("&");

    return crypto.createHash("sha1").update(sorted + CLOUDINARY.API_SECRET).digest("hex");
}

export const objectIdRegex = /^[a-f\d]{24}$/i;