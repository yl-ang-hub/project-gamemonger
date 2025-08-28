import express from "express";
import {
  createCheckoutSession,
  retrieveCheckoutSession,
  saveSuccessfulPurchase,
} from "../controllers/payment.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.put("/", auth, createCheckoutSession);
router.post("/", auth, retrieveCheckoutSession);
router.put("/save", auth, saveSuccessfulPurchase);

export default router;
