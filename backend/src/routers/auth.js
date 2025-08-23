import express from "express";
import * as authControl from "../controllers/auth.js";
import { validateLoginData, validateRegistrationData } from "../validators/users.js";
import { checkErrors } from "../validators/checkErrors.js";

const router = express.Router();

router.put("/register", validateRegistrationData, checkErrors, authControl.register);
router.post("/login", validateLoginData, checkErrors, authControl.login);
router.post("/refresh", authControl.refresh);

export default router;
