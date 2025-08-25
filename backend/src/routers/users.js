import express from "express";
import * as users from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// dev
router.get("/seed", users.seedUsers);

router.get("/:userId", auth, users.getUser);

// USERS MANAGEMENT
router.get("/", users.getAllUsers);
// router.put("/users", userlists.addUser);
// router.delete("/users/:userId", userlists.deleteUser);

export default router;
