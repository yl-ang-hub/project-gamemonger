import express from "express";
import * as userReviews from "../controllers/userReviews.js";
import { auth } from "../middleware/auth.js";
import { validateUserReviews } from "../validators/userReviews.js";
import { checkErrors } from "../validators/checkErrors.js";

const router = express.Router();

router.post(
  "/reviews",
  auth,
  validateUserReviews,
  checkErrors,
  userReviews.addUserReviews
);

export default router;
