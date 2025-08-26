import express from "express";
import * as rawgApi from "../controllers/rawgApi.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/games", rawgApi.getGames);
router.get("/games/:page", rawgApi.getGamesPaginated);
router.post("/games/search/", rawgApi.searchGames);
router.get("/game/:rawgId", rawgApi.getGameDetail);
router.get("/games/trailers/:rawgId", rawgApi.getGameTrailers);
router.get("/games/screenshots/:rawgId", rawgApi.getGameScreenShots);

export default router;
