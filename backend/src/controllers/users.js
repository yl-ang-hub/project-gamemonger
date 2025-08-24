import bcrypt from "bcrypt";
import Users from "../models/Users.js";

export const getUser = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.userId }, { hash: 0 });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "cannot read from database" });
  }
};

export const seedUsers = async (req, res) => {
  try {
    await Users.deleteMany({});
    const hash = await bcrypt.hash("password123", 12);
    const response = await Users.create([
      {
        _id: "68a5b57a096821ed58028e84",
        username: "Shrek",
        picture: "src/assets/images/userImg.jpg",
        hash,
      },
      {
        _id: "68a5b5db741c656f05f7e6dc",
        username: "Goofy",
        picture: "src/assets/images/userImg.jpg",
        hash,
      },
    ]);
    res.json({ status: "ok", msg: "users seeded", details: response });
  } catch (e) {
    console.error(e);
    res.status(400).json("Users seeding failed");
  }
};

// export const getAllUsers = async (req, res) => {
//   try {
//     const allUsers = await Userlists.find();
//     res.json(allUsers);
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "cannot read from database" });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     await Userlists.findOneAndDelete({ _id: req.params.userId });
//     res.json({ status: "ok", msg: "user deleted" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "user not deleted" });
//   }
// };
