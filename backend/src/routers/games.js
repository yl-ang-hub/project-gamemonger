import express from "express";
import checkGameValidInput from "../validators/games.js";
import { checkErrors } from "../validators/checkErrors.js";

import * as games from "../controllers/games.js";

const router = express.Router();

router.get("/games", games.getGames);

router.get("/games/:id", games.getGame);

router.post("/games", checkGameValidInput, checkErrors, games.newGame);

router.patch("/games/:id", games.patchGame);

router.delete("/games/:id", games.deleteGame);

export default router;
