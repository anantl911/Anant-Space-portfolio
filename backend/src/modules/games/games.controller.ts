import type { Request, Response, NextFunction } from "express";
import { GamesService } from "./games.service.js";
import type {
    FinalizeGameRequestParams,
    FinalizeGameRequestBody,
    PlayGameRequestParams,
    DecideGameRequestParams,
    DecideGameRequestBody,
    CleanGamesRequestParams
} from "../../types/games.js";

export const GamesController = {
    addGame: async (req: Request, res: Response, next: NextFunction) => {
        try {
            /* 
                Directly passing body may seem like an anti-pattern.
                But i've ensured strict ZOD validation. I'd request that you 
                maintain this consistent throughout.

                TODO: Check if we are passing direct body elsewhere and add strict validation there too.
            */
            const result = await GamesService.addGame(req.body);
            return res.status(200).json({
                success: true,
                data: result
            });
        } catch (err) {
            next(err);
        }
    },
    
    finalizeGame: async (
        req: Request<FinalizeGameRequestParams, any, FinalizeGameRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const { cdnUrl } = req.body;
            
            const result = await GamesService.finalizeUpload(id, cdnUrl);
            return res.status(200).json({
                success: true,
                message: "Game submitted for approval.",
                data: result
            });
        } catch (err) {
            next(err);
        }
    },

    playGame: async (
        req: Request<PlayGameRequestParams>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { slug } = req.params;
            const result = await GamesService.playGame(slug);
            return res.status(200).json({
                success: true,
                playUrl: result.playUrl
            });
        } catch (err) {
            next(err);
        }
    },

    decideGame: async (
        req: Request<DecideGameRequestParams, any, DecideGameRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = req.params;
            const { decision, rejectionReason } = req.body;
            const result = await GamesService.decideGame(id, decision, rejectionReason);
            return res.status(200).json({
                success: true,
                message: `Game has been ${decision === "ACCEPTED" ? "approved" : "rejected"}.`,
                data: result
            });
        } catch (err) {
            next(err);
        }
    },

    cleanGames: async (
        req: Request<CleanGamesRequestParams>,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { status } = req.params;
            const result = await GamesService.cleanGames(status);
            return res.status(200).json({
                success: true,
                message: `Cleanup completed successfully for ${status} status.`,
                data: result
            });
        } catch (err) {
            next(err);
        }
    }
};
