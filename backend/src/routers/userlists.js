import express from "express";
import * as userlists from "../controllers/userlists.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// SINGLE USER
router.post("/", auth, userlists.getListsForUser);
router.put("/", auth, userlists.addList);
router.patch("/", auth, userlists.renameList);
router.delete("/:userId/:listId", auth, userlists.deleteList);
router.put("/game", auth, userlists.addGame);
router.delete("/:userId/:listId/:gameId", auth, userlists.deleteGame);

// SEED DATA
router.get("/userlists/seed", userlists.seedUsersListsGames);
router.get("/userlists", userlists.getAllUsersAndList);

export default router;
