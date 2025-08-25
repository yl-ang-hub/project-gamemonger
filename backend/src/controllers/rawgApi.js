import dotenv from "dotenv";
dotenv.config();
import { fetchData, fetchDataWithParams } from "../middleware/fetchData.js";
import Games from "../models/Games.js";

export const getGames = async (req, res) => {
  try {
    const data = await fetchData("/games", "GET", undefined, undefined);

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const searchGames = async (req, res) => {
  console.log(req.body.query);
  try {
    const data = await fetchDataWithParams("/games", "GET", undefined, req.body.query);

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getGameDetail = async (req, res) => {
  try {
    // Get data from rawg API
    const data = await fetchData("/games/" + req.params.rawgId, "GET", undefined, undefined);

    // Get price from MongoDB
    const game = await Games.findOne({ rawgId: req.params.rawgId });
    if (game) {
      data.price = game.price;
    } else {
      // Arbitrarily create a price for the game and store in DB
      const price = Math.floor(Math.random() * 10) * 10 + 9.99;
      await Games.create({
        rawgId: req.params.rawgId,
        price: price,
      });
      data.price = price;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getGameTrailers = async (req, res) => {
  try {
    const data = await fetchData(
      "/games/" + req.params.rawgId + "/movies",
      "GET",
      undefined,
      undefined
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
