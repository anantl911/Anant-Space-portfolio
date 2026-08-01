import express from "express";
import { GamesValidator } from "./games.validator.js";
import { GamesController } from "./games.controller.js";

const router = express.Router();

// 1. Add game (Create temporary metadata and get upload presigned URL)
router.post(
    "/add",
    GamesValidator.validateAdd,
    GamesController.addGame
);

// 2. Finalize upload (Extract zip, generate manifest, update status to PENDING)
router.post(
    "/:id/finalize",
    GamesValidator.validateId,
    GamesValidator.validateFinalize,
    GamesController.finalizeGame
);

// 3. Play game (Generate download presigned URL and increment plays count)
router.get(
    "/:slug/play",
    GamesValidator.validateSlug,
    GamesController.playGame
);

// 4. Decide game status - ACCEPTED (APPROVED) or REJECTED
router.patch(
    "/:id/decide",
    GamesValidator.validateId,
    GamesValidator.validateDecide,
    GamesController.decideGame
);

// 5. Cleanup endpoints (Support DELETE/POST/GET to be flexible for admin triggers)
router.delete(
    "/clean/:status",
    GamesValidator.validateClean,
    GamesController.cleanGames
);
router.post(
    "/clean/:status",
    GamesValidator.validateClean,
    GamesController.cleanGames
);
router.get(
    "/clean/:status",
    GamesValidator.validateClean,
    GamesController.cleanGames
);

export default router;