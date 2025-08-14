import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { collection: "games" }
);

const Games = mongoose.model("Games", GameSchema);

export default Games;
