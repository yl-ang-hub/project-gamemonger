import express from "express";
import * as userReviews from "../controllers/userReviews.js";
import { auth } from "../middleware/auth.js";
import { validateUserReviews } from "../validators/userReviews.js";
import { checkErrors } from "../validators/checkErrors.js";

const router = express.Router();

router.get("/reviews", userReviews.getAllReviews);
router.post("/reviews", userReviews.addUserReviews);
router.post("/gameReviews", userReviews.getOneGameReviews);
router.post("/userGameReviews", userReviews.getOneUserReviews);
router.delete("/reviews", userReviews.deleteOneGameReviewByUserId);
router.delete("/review", auth, userReviews.deleteOneGameReviewByReviewId);
router.post(
  "/reviews",
  auth,
  validateUserReviews,
  checkErrors,
  userReviews.addUserReviews
);

export default router;
