import express from "express";
import Games from "../models/Games.js";

const getGames = async (req, res) => {
  try {
    const games = await Games.find();
    res.json(games);
  } catch (error) {
    res.status(400).send("an error has occured");
  }
};

const getGame = async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);
    res.json(game);
  } catch (error) {
    res.status(400).send("an error has occured");
  }
};

const newGame = async (req, res) => {
  try {
    const newGame = new Games({
      name: req.body.name,
      year: req.body.year,
    });
    await newGame.save();
    res.json({ status: "ok", msg: "adding successful" });
  } catch (error) {
    res.status(400).send("an error has occured");
  }
};

const patchGame = async (req, res) => {
  try {
    const response = await Games.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      year: req.body.year,
    });
    res.json({ status: "ok", msg: "updating successful" });
  } catch (error) {
    res.status(400).send("an error has occured");
  }
};

const deleteGame = async (req, res) => {
  try {
    await Games.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "deleting successful" });
  } catch (error) {
    res.status(400).send("an error has occured");
  }
};

export { getGames, getGame, deleteGame, newGame, patchGame };
