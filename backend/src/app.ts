import express from "express";
import cors from "cors";
import "dotenv/config.js";
import serverRoutes from "./routes.js";
import ErrorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(
    cors({
        origin: process.env.ORIGIN_URL || "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 200,
    }),
);
app.use(express.json());

app.use("/api/v1", serverRoutes);

app.use(ErrorHandler);

export default app;
