import mongoose from "mongoose";

export const GamesSchema = new mongoose.Schema(
  {
    rawgId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    screenshots: { type: [String], required: true },
  },
  {
    collection: "GamesInLists",
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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lists: {
      type: [ListsSchema],
      // Creates Wishlist by default for new users
      default: [{ name: "Wishlist", games: [] }],
    },
  },
  {
    collection: "Userlists",
  }
);

export default mongoose.model("Userlist", UserListsSchema);
