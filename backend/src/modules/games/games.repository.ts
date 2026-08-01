import { Game } from "../../models/games.js";
import type { CreateGameDTO, IGame, GameDocument } from "../../types/games.js";

export const GamesRepository = {
    addGame: async (data: CreateGameDTO) => {
        const game = new Game(data);
        return await game.save();
    },
    updateGame: async (id: string, data: Partial<IGame>) => {
        // Return the updated document
        const newGame = await Game.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        ).lean();
        return newGame;
    },
    findGameById: async (id: string): Promise<GameDocument | null> => {
        return await Game.findById(id);
    },
    findGameBySlug: async (slug: string): Promise<GameDocument | null> => {
        return await Game.findOne({ slug });
    },
    findGamesForCleanup: async (
        status: "UPLOADING" | "REJECTED",
        timeLimit: Date
    ): Promise<GameDocument[]> => {
        if (status === "UPLOADING") {
            return await Game.find({
                status: "UPLOADING",
                createdAt: { $lt: timeLimit }
            });
        } else {
            return await Game.find({
                status: "REJECTED",
                updatedAt: { $lt: timeLimit }
            });
        }
    },
    deleteGameById: async (id: string) => {
        return await Game.findByIdAndDelete(id);
    }
};
