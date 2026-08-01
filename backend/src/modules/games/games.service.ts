import { preSignUpload, preSignDownload, deleteS3Folder, listFiles } from "../../lib/filebase/utils/s3Helpers.js";
import type { CreateGameDTO, GameDocument, GameInput } from "../../types/games.js";
import { GamesRepository } from "./games.repository.js";
import ApiError from "../../utils/ApiError.js";

export const GamesService = {
    addGame: async (data: GameInput) => {
        const slug = data.title.toLowerCase().trim().split(" ").join("-");
        const defaultGame: CreateGameDTO = {
            ...data,
            status: "UPLOADING",
            slug,
            storage: { version: 1 }
        };

        const result = await GamesRepository.addGame(defaultGame);
        const uploadUrl = await preSignUpload(result._id.toString());
        return { uploadUrl, gameId: result._id, id: result._id };
    },

    finalizeUpload: async (id: string, cdnUrl: string) => {
        const game = await GamesRepository.findGameById(id);
        if (!game) {
            throw new ApiError(404, "Game not found", null);
        }

        const prefix = `games/${id}/`;
        const { entry, files, totalSize } = await listFiles(prefix);

        const updatedGame = await GamesRepository.updateGame(id, {
            status: "PENDING",
            storage: {
                key: cdnUrl,
                size: totalSize,
                version: 1
            },
            manifest: { entry, files }
        });

        return updatedGame;
    },

    playGame: async (slug: string) => {
        const game = await GamesRepository.findGameBySlug(slug);
        if (!game) {
            throw new ApiError(404, "Game not found", null);
        }

        if (!game.manifest || !game.manifest.entry) {
            throw new ApiError(400, "Game assets have not been finalized yet", null);
        }

        const entryKey = `games/${game._id}/${game.manifest.entry}`;
        const playUrl = await preSignDownload(entryKey);

        // Increment play count
        game.plays = (game.plays || 0) + 1;
        await game.save();

        return { playUrl };
    },

    decideGame: async (id: string, decision: "ACCEPTED" | "REJECTED", rejectionReason?: string) => {
        const game = await GamesRepository.findGameById(id);
        if (!game) {
            throw new ApiError(404, "Game not found", null);
        }

        const status = decision === "ACCEPTED" ? "APPROVED" : "REJECTED";
        const updateData: Partial<GameDocument> = { status };

        if (decision === "REJECTED") {
            updateData.rejectionReason = rejectionReason || "Rejected by administrator";
            await deleteS3Folder(`games/${id}/`);
        } else {
            updateData.rejectionReason = null;
        }

        return await GamesRepository.updateGame(id, updateData);
    },

    cleanGames: async (status: "UPLOADING" | "REJECTED") => {
        let timeLimit: Date;
        if (status === "UPLOADING") {
            timeLimit = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes
        } else {
            timeLimit = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 1 week
        }

        const games = await GamesRepository.findGamesForCleanup(status, timeLimit);
        let deletedCount = 0;

        for (const game of games) {
            const idStr = game._id.toString();
            await deleteS3Folder(`games/${idStr}/`);
            await GamesRepository.deleteGameById(idStr);
            deletedCount++;
        }

        return { status, deletedCount };
    }
};