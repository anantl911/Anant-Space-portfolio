import type { HydratedDocument } from "mongoose";

export interface IGame {
    title: string;
    description: string;
    slug: string;

    author: string;

    engine: "godot" | "phaser" | "pixijs" | "unity" | "other";

    storage: {
        key: string | null;
        size: number | null;
        version: number;
    };

    thumbnail: string;

    manifest?: {
        entry: string;
        files: string[];
    } | null;

    status: "PENDING" | "APPROVED" | "REJECTED" | "UPLOADING";
    rejectionReason: string | null;

    plays: number;

    createdAt: Date;
    updatedAt: Date;
}

export type GameDocument = HydratedDocument<IGame>;

export type GameUrlUpdation = {
    gameId: string
    cdnUrl: string
};

export type GameInput = {
    title: string,
    description: string,
    author: string,
    engine: "godot" | "phaser" | "pixijs" | "unity" | "other",
    thumbnail: string
};

export type CreateGameDTO = GameInput & {
    status: "PENDING" | "APPROVED" | "REJECTED" | "UPLOADING",
    slug: string,
    storage: {
        version: number
    }
};

export type FinalizeGameRequestParams = {
    id: string;
};

export type FinalizeGameRequestBody = {
    cdnUrl: string;
};

export type PlayGameRequestParams = {
    slug: string;
};

export type DecideGameRequestParams = {
    id: string;
};

export type DecideGameRequestBody = {
    decision: "ACCEPTED" | "REJECTED";
    rejectionReason?: string;
};

export type CleanGamesRequestParams = {
    status: "UPLOADING" | "REJECTED";
};