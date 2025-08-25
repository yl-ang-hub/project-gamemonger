import { body } from "express-validator";

export const validateUserReviews = [
  body("review", "rating is required").notEmpty(),
  body("rawgId", "password is required").notEmpty(),
  body("userId", "password is required").notEmpty(),
  body("rating", "rating must be between").isLength({ min: 1, max: 5 }),
];
