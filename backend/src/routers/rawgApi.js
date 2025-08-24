import express from "express";
import * as rawgApi from "../controllers/rawgApi.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/games", rawgApi.getGames);

export default router;
