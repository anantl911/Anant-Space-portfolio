import app from '../backend/src/app.js';
import { connectDB } from '../backend/src/database/instance.js';

let dbInitialized = false;

export default async function (req: any, res: any) {
    if (!dbInitialized) {
        try {
            await connectDB();
            dbInitialized = true;
        } catch (error) {
            console.error("Failed to connect to database in serverless function:", error);
            // Optionally, you can return a 500 error immediately if DB fails
            // return res.status(500).json({ success: false, message: "Database connection failed" });
        }
    }

    // Pass the request to the Express app
    return app(req, res);
}
