import express from "express";
import * as users from "../controllers/users.js";
import { validateLoginData, validateRegistrationData } from "../validators/users.js";
import { checkErrors } from "../validators/checkErrors.js";

const router = express.Router();

router.put("/register", validateRegistrationData, checkErrors, users.register);
router.post("/login", validateLoginData, checkErrors, users.login);
router.post("/refresh", users.refresh);

// dev
router.get("/seed", users.seedUsers);

export default router;
