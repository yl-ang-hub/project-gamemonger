import { body } from "express-validator";

const checkCustomerValidInput = [
  body("name", "name is required").not().isEmpty(),
  body("year", "year is required").notEmpty(),
  body("year", "year must be a number").isInt(),
];

export default checkCustomerValidInput;
