import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Users from "../models/Users.js";
import Userlists from "../models/Userlists.js";

export const register = async (req, res) => {
  try {
    const duplicate = await Users.findOne({ username: req.body.username });

    if (duplicate) {
      return res.status(400).json("username has been used");
    }

    // Create new user in Users collection
    const hash = await bcrypt.hash(req.body.password, 12);
    const newUser = await Users.create({
      username: req.body.username,
      hash,
    });

    // Create default wishlist for new user
    await Userlists.create({
      userId: newUser._id,
    });

    res.json({ status: "ok", msg: "user registered" });
  } catch (e) {
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
    res.status(401).json({ status: "error", msg: "login failed" });
  }
};

export const refresh = async (req, res) => {
  try {
    if (!req.body.refresh) {
      return res.status(401).json({ status: "error", msg: "missing token" });
    }

    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    if (!decoded) {
      return res.status(401).json({ status: "error", msg: "missing token" });
    }

    const claims = {
      username: decoded.username,
      id: decoded.id,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    return res.json({ access });
  } catch (e) {
    return res.status(401).json({ status: "error", msg: "unauthorised" });
  }
};
