import { body } from "express-validator";

export const validateUserReviews = [
  body("review", "review is required").notEmpty(),
  body("rawgId", "rawgId is required").notEmpty(),
  body("userId", "userId is required").notEmpty(),
  body("rating", "rating must be between").isLength({ min: 1, max: 5 }),
];
