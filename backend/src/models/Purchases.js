import mongoose from "mongoose";

const PurchasesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sessionId: { type: String, required: true },
    purchased_date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    items: { type: Array, required: true },
  },
  { collection: "Purchases" }
);

export default mongoose.model("purchase", PurchasesSchema);
