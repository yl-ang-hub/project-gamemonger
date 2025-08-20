import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Users from "../models/Users.js";

export const register = async (req, res) => {
  try {
    const duplicate = await Users.findOne({ username: req.body.username });
    console.log(duplicate);
    if (duplicate) {
      return res.status(400).json("username has been used");
    }

    const hash = await bcrypt.hash(req.body.password, 12);
    await Users.create({
      username: req.body.username,
      hash,
    });
    // TODO: Create userlist entry for new user
    res.json({ status: "ok", msg: "user registered" });
  } catch (e) {
    console.error(e.message);
    res.status(400).json({ status: "error", msg: "user cannot be registered" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const auth = await bcrypt.compare(req.body.password, user.hash);
    if (!auth) {
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      username: req.body.username,
      id: user._id,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (e) {
    console.error(e.message);
    res.status(401).json({ status: "error", msg: "login failed" });
  }
};

export const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    if (!decoded) {
      res.status(401).json({ status: "error", msg: "missing token" });
    }

    const claims = {
      username: decoded.username,
      id: decoded.id,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (e) {
    console.error(e.message);
    res.status(401).json({ status: "error", msg: "unauthorised" });
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
        hash,
      },
      {
        _id: "68a5b5db741c656f05f7e6dc",
        username: "Goofy",
        hash,
      },
    ]);
    res.json({ status: "ok", msg: "users seeded", details: response });
  } catch (e) {
    console.error(e);
    res.status(400).json("Users seeding failed");
  }
};
