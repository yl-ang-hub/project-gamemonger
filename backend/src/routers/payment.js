import express from "express";
import {
  createCheckoutSession,
  retrieveCheckoutSession,
  saveSuccessfulPurchase,
} from "../controllers/payment.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.put("/", auth, createCheckoutSession);
router.post("/", retrieveCheckoutSession);
router.put("/save", saveSuccessfulPurchase);

export default router;
