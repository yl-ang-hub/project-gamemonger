import express from "express";
import * as users from "../controllers/users.js";

const router = express.Router();

// USERS MANAGEMENT
router.get("/users", users.getAllUsers);
router.put("/users", users.addUser);
router.delete("/users/:userId", users.deleteUser);

// SINGLE USER
router.get("/user/:userId", users.getUser);
router.post("/user/lists", users.getListsForUser);
router.put("/user/lists", users.addList);
router.patch("/user/lists", users.renameList);
router.put("/user/game", users.addGame);
router.delete("/:userId/:listId/:gameId", users.deleteGame);

// SEED DATA
router.get("/users/seed", users.seedUsersListsGames);

export default router;
