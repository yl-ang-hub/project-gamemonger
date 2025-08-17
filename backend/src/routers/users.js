import express from "express";
import * as users from "../controllers/users.js";

const router = express.Router();

router.get("/users", users.getUsers);
router.put("/users", users.addUser);
router.delete("/users/:userId", users.deleteUser);
router.post("/user/lists", users.getListsForUser);
router.put("/user/lists", users.addList);
router.patch("/user/lists", users.renameList);
router.put("/user/game", users.addGame);

// PATCH to send ids through body despite delete mechanism
router.delete("/:userId/:listId/:gameId", users.deleteGame);

// GET to seed
router.get("/users/seed", users.seedUsersListsGames);

export default router;
