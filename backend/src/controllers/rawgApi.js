import dotenv from "dotenv";
dotenv.config();
import { fetchData, fetchDataWithParams } from "../middleware/fetchData.js";

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
    const data = await fetchDataWithParams(
      "/games",
      "GET",
      undefined,
      req.body.query
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getGameDetail = async (req, res) => {
  try {
    const data = await fetchData(
      "/games/" + req.params.rawgId,
      "GET",
      undefined,
      undefined
    );

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
