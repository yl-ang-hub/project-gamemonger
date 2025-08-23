import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hash: { type: String, required: true },
    picture: { type: String, default: "src/assets/images/userImg.jpg" },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "Users" }
);

export default mongoose.model("User", UsersSchema);
