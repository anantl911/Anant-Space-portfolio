import app from "./app.js";
import { connectDB } from "./database/instance.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
    await connectDB();
    app.listen(PORT, () => {
        console.log("Server online on ", PORT, " port");
    });
}

startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
