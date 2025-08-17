import mongoose from "mongoose";

export const GamesSchema = new mongoose.Schema(
  {
    rawgId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    screenshots: { type: [String], required: true },
  },
  {
    collection: "Games",
  }
);

const ListsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    games: [GamesSchema],
  },
  {
    collection: "Lists",
  }
);

const UserListsSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    lists: {
      type: [ListsSchema],
      // Creates Wishlist by default for new users
      default: [{ name: "Wishlist", games: [] }],
    },
  },
  {
    collection: "Users",
  }
);

export default mongoose.model("user", UserListsSchema);
