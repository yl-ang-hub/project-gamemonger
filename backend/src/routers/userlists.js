import express from "express";
import * as userlists from "../controllers/userlists.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// USERS MANAGEMENT
router.get("/users", userlists.getAllUsers);
router.put("/users", userlists.addUser);
router.delete("/users/:userId", userlists.deleteUser);

// SINGLE USER
router.get("/user/:userId", userlists.getUser);
router.post("/user/lists", auth, userlists.getListsForUser);
router.put("/user/lists", userlists.addList);
router.patch("/user/lists", userlists.renameList);
router.put("/user/game", userlists.addGame);
router.delete("/:userId/:listId/:gameId", userlists.deleteGame);

// SEED DATA
router.get("/userlists/seed", userlists.seedUsersListsGames);

export default router;
