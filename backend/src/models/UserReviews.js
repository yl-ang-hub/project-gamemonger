import mongoose from "mongoose";

const UserReviewsSchema = new mongoose.Schema(
  {
    // 1 to 5
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    // put in authCtx.userId
    // userId: { type: String, required: true }, // store just id so easier to delete
    rawgId: { type: String, required: true },
    // rawgId: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "reviews" }
);

export default mongoose.model("Reviews", UserReviewsSchema);
