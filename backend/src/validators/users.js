import { body } from "express-validator";

export const validateRegistrationData = [
  body("username", "username is required").notEmpty(),
  body("password", "password is required").notEmpty(),
  body("password", "password must be at least 8 characters long").isLength({ min: 8 }),
];

export const validateLoginData = [
  body("username", "username is required").notEmpty(),
  body("password", "password is required").notEmpty(),
];
