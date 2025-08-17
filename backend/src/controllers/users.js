import { v4 as uuidv4 } from "uuid";
import Users from "../models/Users.js";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    res.json(allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "cannot read from database" });
  }
};

export const addUser = async (req, res) => {
  try {
    const newUser = await Users.create({
      username: req.body.username,
    });
    res.json({ status: "ok", msg: "user created", details: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "user not created" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Users.findOneAndDelete({ _id: req.params.userId });
    res.json({ status: "ok", msg: "user deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "user not deleted" });
  }
};

export const getListsForUser = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.body.userId });
    res.json({ status: "ok", msg: "lists found", lists: user.lists });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "cannot read from database" });
  }
};

export const addList = async (req, res) => {
  try {
    const newList = {
      name: req.body.listName,
      games: [],
    };
    const user = await Users.findOne({ _id: req.body.userId });
    user.lists.push(newList);
    await user.save();
    res.json({ status: "ok", msg: "list saved", details: user });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "list not created" });
  }
};

export const renameList = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.body.userId });
    const list = user.lists.filter((list) => list._id == req.body.listId)[0];
    list.name = req.body.listName;
    await user.save();
    res.json({ status: "ok", msg: "list renamed", details: list });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "unable to rename list" });
  }
};

export const addGame = async (req, res) => {
  try {
    const newGame = {
      rawgId: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      screenshots: req.body.imgArray,
    };
    const user = await Users.findOne({ _id: req.body.userId });
    const list = user.lists.filter((list) => list._id == req.body.listId)[0];
    list.games.push(newGame);
    await user.save();
    res.json({ status: "ok", msg: "game saved", details: list });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Game not added" });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.userId });
    const list = user.lists.filter((list) => list._id == req.params.listId)[0];
    const idx = list.games.findIndex((game) => game._id == req.params.gameId);
    list.games.splice(idx, 1);
    await user.save();
    res.json({ status: "ok", msg: "game deleted", details: list });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Game not deleted" });
  }
};

export const seedUsersListsGames = async (req, res) => {
  try {
    const response = await Users.create([
      {
        _id: "68a0cc104bc0904a639c915a",
        username: "Shrek",
        lists: [
          {
            _id: "68a0cc104bc0904a639c915b",
            name: "Wishlist",
            games: [
              {
                rawgId: "fde1a3d2-a48e-4ebc-a304-86fbdfe11e28",
                name: "Tetris",
                description: "blocks",
                screenshots: ["img1", "img2", "img3"],
                _id: "68a14754384ddd44feda38cf",
              },
              {
                rawgId: "a249b85f-fef7-4e2c-91f2-2f0cf37b5845",
                name: "Rayearth",
                description: "magic knights",
                screenshots: ["img1", "img2", "img3"],
                _id: "68a14761384ddd44feda38d6",
              },
            ],
          },
          {
            name: "don't sleep at night",
            games: [
              {
                rawgId: "f88e99a6-d752-4bf9-a439-0bb36be9e489",
                name: "Walking dead",
                description: "kill the zombies!",
                screenshots: ["img1", "img2", "zombiespit"],
                _id: "68a14bfba0440b1bd16581c9",
              },
              {
                rawgId: "e1776a48-13de-442f-8762-b28e505b369d",
                name: "Resident Evil",
                description: "who is she...",
                screenshots: ["img1", "img2", "weirdzombies"],
                _id: "68a14c25a0440b1bd16581d1",
              },
              {
                rawgId: "3379d47b-1dce-4ba1-9888-4488eec4f8f6",
                name: "Resident Evil 2",
                description: "who is she...twin?",
                screenshots: ["img1", "img2", "weirdzombies"],
                _id: "68a14c30a0440b1bd16581da",
              },
              {
                rawgId: "9f934dd5-4436-4bcf-9cee-3d5d57dadb3a",
                name: "Resident Evil 3",
                description: "omg...gore?",
                screenshots: ["img1", "img2", "weirdzombies"],
                _id: "68a14c38a0440b1bd16581e4",
              },
            ],
            _id: "68a14bcca0440b1bd16581c2",
          },
        ],
        __v: 17,
      },
      {
        _id: "68a12f53d27ee9c5eb63955f",
        username: "Goofy",
        lists: [
          {
            _id: "68a12f53d27ee9c5eb639560",
            name: "Wishlist",
            games: [
              {
                rawgId: "06f2d398-ac79-42aa-87da-a750eda71b2d",
                name: "Digimon Original",
                description: "predecessor to pokemon",
                screenshots: ["img1", "img2", "dimensionaltravel"],
                _id: "68a14d69a873f294438018fd",
              },
            ],
          },
          {
            name: "Anime games",
            games: [
              {
                rawgId: "d742aa6a-277d-4f73-bef3-0ae9919abdc8",
                name: "Final Fantasy XII",
                description: "best animation",
                screenshots: ["img1", "img2"],
                _id: "68a14e7ac323c5a09536c929",
              },
            ],
            _id: "68a14e3bc323c5a09536c923",
          },
        ],
        __v: 7,
      },
    ]);
    res.json({ status: "ok", msg: "Seeding is successful", details: response });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Seeding failed" });
  }
};
