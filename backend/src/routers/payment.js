import express from "express";
import { createCheckoutSession } from "../controllers/payment.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.put("/", auth, createCheckoutSession);

export default router;
