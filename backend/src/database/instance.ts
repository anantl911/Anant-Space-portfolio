import mongoose from "mongoose";
import { MONGO_CONFIG } from "./config.js";

export async function connectDB() {
    const dbUrl = `mongodb+srv://${MONGO_CONFIG.USERNAME}:${MONGO_CONFIG.PASSWORD}@${MONGO_CONFIG.ENDPOINT}/?appName=${MONGO_CONFIG.APP_NAME}`;
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
}

