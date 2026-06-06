import express from "express";
import cors from "cors";
import "dotenv/config.js";
import serverRoutes from "./routes.js";
import { connectDB } from "./database/instance.js";
import ErrorHandler from "./middlewares/error.middleware.js";

const PORT = process.env.PORT;

const server = express();

server.use(
    cors({
        origin: process.env.ORIGIN_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 200,
    }),
);
server.use(express.json());

server.use("/api/v1", serverRoutes);

server.use(ErrorHandler);

async function startServer() {
    await connectDB();
    server.listen(PORT, () => {
        console.log("Server online on ", PORT, " port");
    });
}

startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
