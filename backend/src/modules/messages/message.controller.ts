import type { Request, Response, NextFunction } from "express"
import { MessagesService } from "./message.service.js";

export const MessagesController = {
    createMsg: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await MessagesService.createMsg(req.body);
            res.status(201).json({ success: true });
        } catch (err) {
            next(err);
        }
    }
};