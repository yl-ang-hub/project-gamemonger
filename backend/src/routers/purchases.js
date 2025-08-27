import express from "express";
import { getPurchases } from "../controllers/purchases.js";

const router = express.Router();

router.post("/", getPurchases);

export default router;
