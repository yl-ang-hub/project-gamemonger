import express from "express";
import * as rawgApi from "../controllers/rawgApi.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/games", rawgApi.getGames);
router.get("/games/:rawgId", rawgApi.getGameDetail);
router.get("/games/trailers/:rawgId", rawgApi.getGameTrailers);

export default router;
