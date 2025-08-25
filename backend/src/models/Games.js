import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    rawgId: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { collection: "games" }
);

const Games = mongoose.model("Games", GameSchema);

export default Games;
