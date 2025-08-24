import Userlists from "../models/Userlists.js";

// export const initListForNewUser = async (req, res) => {
//   try {
//     const newUser =
//     res.json({ status: "ok", msg: "user created", details: newUser });
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ status: "error", msg: "user not created" });
//   }
// };

export const getListsForUser = async (req, res) => {
  try {
    const listsOfUser = await Userlists.findOne({ userId: req.body.userId });
    res.json(listsOfUser?.lists);
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
    const user = await Userlists.findOne({ userId: req.body.userId });
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
    const user = await Userlists.findOne({ userId: req.body.userId });
    const list = user.lists.filter((list) => list._id == req.body.listId)[0];
    list.name = req.body.listName;
    await user.save();
    res.json({ status: "ok", msg: "list renamed", details: list });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "unable to rename list" });
  }
};

export const deleteList = async (req, res) => {
  try {
    console.log("running", req.params.userId, req.params.listId);
    const user = await Userlists.findOne({ userId: req.params.userId });
    const newLists = user.lists.filter((list) => list._id != req.params.listId);
    console.log(newLists);
    user.lists = newLists;
    await user.save();
    res.json({ status: "ok", msg: "list delete", user });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "unable to delete list" });
  }
};

export const addGame = async (req, res) => {
  try {
    const newGame = {
      rawgId: "test1234",
      name: req.body.name,
      description: req.body.description,
      screenshots: req.body.imgArray,
    };
    const user = await Userlists.findOne({ _id: req.body.userId });
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
    const user = await Userlists.findOne({ _id: req.params.userId });
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
    await Userlists.deleteMany({});
    const response = await Userlists.create(usersAndUserlistsSeedData);
    res.json({ status: "ok", msg: "Seeding is successful", details: response });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Seeding failed" });
  }
};

const usersAndUserlistsSeedData = [
  {
    _id: "68a0cc104bc0904a639c915a",
    userId: "68a5b57a096821ed58028e84",
    lists: [
      {
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
        _id: "68a0cc104bc0904a639c915b",
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
      {
        name: "Anime games",
        games: [
          {
            rawgId: "test1234",
            name: "Final Fantasy XII",
            description: "good graphics game",
            screenshots: ["img1", "img2"],
            _id: "68a1fcc31d1e4c3d21423b53",
          },
          {
            rawgId: "test1234",
            name: "Final Fantasy XIII",
            description: "good graphics game",
            screenshots: ["img1", "img2"],
            _id: "68a1fcca1d1e4c3d21423b60",
          },
          {
            rawgId: "test1234",
            name: "Final Fantasy V",
            description: "good graphics game",
            screenshots: ["img1", "img2"],
            _id: "68a1fccd1d1e4c3d21423b6e",
          },
          {
            rawgId: "test1234",
            name: "Final Fantasy VII",
            description: "good graphics game",
            screenshots: ["img1", "img2"],
            _id: "68a1fcd21d1e4c3d21423b7d",
          },
          {
            rawgId: "test1234",
            name: "Final Fantasy VI",
            description: "good graphics game",
            screenshots: ["img1", "img2"],
            _id: "68a1fcd51d1e4c3d21423b8d",
          },
          {
            rawgId: "test1234",
            name: "Final Fantasy VII",
            description: "good graphics game",
            screenshots: ["img1", "img2"],
            _id: "68a1fcd81d1e4c3d21423b9e",
          },
          {
            rawgId: "test1234",
            name: "Final Fantasy IV",
            description: "good graphics game",
            screenshots: ["img1", "img2"],
            _id: "68a1fcde1d1e4c3d21423bb0",
          },
        ],
        _id: "68a1fc951d1e4c3d21423b47",
      },
      {
        name: "Platform games",
        games: [
          {
            rawgId: "test1234",
            name: "Flappy Bird",
            description: "just fly",
            screenshots: ["img1", "img2"],
            _id: "68a1fd101d1e4c3d21423bd7",
          },
          {
            rawgId: "test1234",
            name: "Angry Birds",
            description: "cannon away",
            screenshots: ["img1", "img2"],
            _id: "68a1fd231d1e4c3d21423bec",
          },
          {
            rawgId: "test1234",
            name: "Angry Birds 2",
            description: "cannon away",
            screenshots: ["img1", "img2"],
            _id: "68a1fd2c1d1e4c3d21423c02",
          },
          {
            rawgId: "test1234",
            name: "Angry Birds 3",
            description: "cannon away",
            screenshots: ["img1", "img2"],
            _id: "68a1fd2f1d1e4c3d21423c19",
          },
        ],
        _id: "68a1fced1d1e4c3d21423bc3",
      },
      {
        name: "Romantic games",
        games: [
          {
            rawgId: "test1234",
            name: "Choose your date",
            description: "Ew",
            screenshots: ["img1", "img2"],
            _id: "68a1fd4b1d1e4c3d21423c4a",
          },
          {
            rawgId: "test1234",
            name: "Bachelors and Bachelorettes",
            description: "Ew",
            screenshots: ["img1", "img2"],
            _id: "68a1fd621d1e4c3d21423c64",
          },
        ],
        _id: "68a1fd3a1d1e4c3d21423c31",
      },
      {
        name: "Casino games",
        games: [
          {
            rawgId: "test1234",
            name: "Dai Dee",
            description: "Big 2",
            screenshots: ["img1", "img2"],
            _id: "68a1fd811d1e4c3d21423c9b",
          },
          {
            rawgId: "test1234",
            name: "Texas Hold Em",
            description: "Poker",
            screenshots: ["img1", "img2"],
            _id: "68a1fd8c1d1e4c3d21423cb8",
          },
          {
            rawgId: "test1234",
            name: "Blackjack",
            description: "Reach 21",
            screenshots: ["img1", "img2"],
            _id: "68a1fd951d1e4c3d21423cd6",
          },
        ],
        _id: "68a1fd6d1d1e4c3d21423c7f",
      },
    ],
    __v: 20,
  },
  {
    _id: "68a12f53d27ee9c5eb63955f",
    userId: "68a5b5db741c656f05f7e6dc",
    lists: [
      {
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
        _id: "68a12f53d27ee9c5eb639560",
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
    __v: 0,
  },
];
