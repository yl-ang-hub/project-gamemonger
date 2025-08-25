import Userlists from "../models/Userlists.js";

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
    const user = await Userlists.findOne({ userId: req.params.userId });
    const newLists = user.lists.filter((list) => list._id != req.params.listId);
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
      rawgId: req.body.rawgId,
      name: req.body.name,
      description: req.body.description,
      screenshots: req.body.screenshot,
    };
    const user = await Userlists.findOne({ userId: req.body.userId });
    const list = user.lists.filter((list) => list._id == req.body.listId)[0];
    console.log(list);
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
    const user = await Userlists.findOne({ userId: req.params.userId });
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

// To help with seeding data
export const getAllUsersAndList = async (req, res) => {
  try {
    const response = await Userlists.find();
    res.json({ status: "ok", msg: "successful", details: response });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Reading from database failed" });
  }
};

const usersAndUserlistsSeedData = [
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
  {
    _id: "68a0cc104bc0904a639c915a",
    userId: "68a5b57a096821ed58028e84",
    lists: [
      {
        name: "Wishlist",
        games: [
          {
            rawgId: "3328",
            name: "The Witcher 3: Wild Hunt",
            description:
              "<p>The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.</p>\n<p>CD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.</p>\n<p>Players praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
            ],
            _id: "68ac126ec94bfd84b1d2f132",
          },
          {
            rawgId: "4200",
            name: "Portal 2",
            description:
              "<p>Portal 2 is a first-person puzzle game developed by Valve Corporation and released on April 19, 2011 on Steam, PS3 and Xbox 360. It was published by Valve Corporation in digital form and by Electronic Arts in physical form. </p>\n<p>Its plot directly follows the first game&#39;s, taking place in the Half-Life universe. You play as Chell, a test subject in a research facility formerly ran by the company Aperture Science, but taken over by an evil AI that turned upon its creators, GladOS. After defeating GladOS at the end of the first game but failing to escape the facility, Chell is woken up from a stasis chamber by an AI personality core, Wheatley, as the unkempt complex is falling apart. As the two attempt to navigate through the ruins and escape, they stumble upon GladOS, and accidentally re-activate her...</p>\n<p>Portal 2&#39;s core mechanics are very similar to the first game&#39;s ; the player must make their way through several test chambers which involve puzzles. For this purpose, they possess a Portal Gun, a weapon capable of creating teleportation portals on white surfaces. This seemingly simple mechanic and its subtleties coupled with the many different puzzle elements that can appear in puzzles allows the game to be easy to start playing, yet still feature profound gameplay. The sequel adds several new puzzle elements, such as gel that can render surfaces bouncy or allow you to accelerate when running on them.</p>\n<p>The game is often praised for its gameplay, its memorable dialogue and writing and its aesthetic. Both games in the series are responsible for inspiring most puzzle games succeeding them, particularly first-person puzzle games. The series, its characters and even its items such as the portal gun and the companion cube have become a cultural icon within gaming communities.</p>\n<p>Portal 2 also features a co-op mode where two players take on the roles of robots being led through tests by GladOS, as well as an in-depth level editor.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
            ],
            _id: "68ac141ac94bfd84b1d2f422",
          },
          {
            rawgId: "5679",
            name: "The Elder Scrolls V: Skyrim",
            description:
              "<p>The fifth game in the series, Skyrim takes us on a journey through the coldest region of Cyrodiil. Once again player can traverse the open world RPG armed with various medieval weapons and magic, to become a hero of Nordic legends –Dovahkiin, the Dragonborn. After mandatory character creation players will have to escape not only imprisonment but a fire-breathing dragon. Something Skyrim hasn’t seen in centuries.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
            ],
            _id: "68ac143fc94bfd84b1d2f463",
          },
        ],
        _id: "68a0cc104bc0904a639c915b",
      },
      {
        name: "don't sleep at night",
        games: [
          {
            rawgId: "5286",
            name: "Tomb Raider (2013)",
            description:
              "<p>A cinematic revival of the series in its action third person form, Tomb Rider follows Lara in her least experience period of life – her youth. Heavily influenced by Naughty Dog’s “Uncharted”, the game is a mix of everything, from stealth and survival to combat and QTE action scenes.<br />\nYoung Lara Croft arrives on the Yamatai, lost island near Japan, as the leader of the expedition in search of the Yamatai Kingdom, with a diverse team of specialists. But shipwreck postponed the successful arrival and seemingly forgotten island is heavily populated with hostile inhabitants, cultists of Solarii Brotherhood.<br />\nThe game will be graphic at times, especially after failed QTE’s during some of the survival scenes, but overall players will enjoy classic action adventure, reminiscent of the beginning of the series. This game is not a direct sequel or continuation of existing sub-series within the franchise, but a reboot, setting up Tomb Raider to represent modern gaming experience.<br />\nThe game has RPG elements and has a world, which you can explore during the story campaign and after the completion. As well as multiplayer mode, where 2 teams (4 scavengers and 4 survivors) are clashing in 3 game modes while using weapons and environments from the single-player campaign.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
            ],
            _id: "68ac142fc94bfd84b1d2f439",
          },
        ],
        _id: "68a14bcca0440b1bd16581c2",
      },
      {
        name: "Anime games",
        games: [
          {
            rawgId: "5286",
            name: "Tomb Raider (2013)",
            description:
              "<p>A cinematic revival of the series in its action third person form, Tomb Rider follows Lara in her least experience period of life – her youth. Heavily influenced by Naughty Dog’s “Uncharted”, the game is a mix of everything, from stealth and survival to combat and QTE action scenes.<br />\nYoung Lara Croft arrives on the Yamatai, lost island near Japan, as the leader of the expedition in search of the Yamatai Kingdom, with a diverse team of specialists. But shipwreck postponed the successful arrival and seemingly forgotten island is heavily populated with hostile inhabitants, cultists of Solarii Brotherhood.<br />\nThe game will be graphic at times, especially after failed QTE’s during some of the survival scenes, but overall players will enjoy classic action adventure, reminiscent of the beginning of the series. This game is not a direct sequel or continuation of existing sub-series within the franchise, but a reboot, setting up Tomb Raider to represent modern gaming experience.<br />\nThe game has RPG elements and has a world, which you can explore during the story campaign and after the completion. As well as multiplayer mode, where 2 teams (4 scavengers and 4 survivors) are clashing in 3 game modes while using weapons and environments from the single-player campaign.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
            ],
            _id: "68ac1433c94bfd84b1d2f446",
          },
          {
            rawgId: "5679",
            name: "The Elder Scrolls V: Skyrim",
            description:
              "<p>The fifth game in the series, Skyrim takes us on a journey through the coldest region of Cyrodiil. Once again player can traverse the open world RPG armed with various medieval weapons and magic, to become a hero of Nordic legends –Dovahkiin, the Dragonborn. After mandatory character creation players will have to escape not only imprisonment but a fire-breathing dragon. Something Skyrim hasn’t seen in centuries.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
            ],
            _id: "68ac143dc94bfd84b1d2f454",
          },
        ],
        _id: "68a1fc951d1e4c3d21423b47",
      },
      {
        name: "Platform games",
        games: [
          {
            rawgId: "3498",
            name: "Grand Theft Auto V",
            description:
              "<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. <br />\nSimultaneous storytelling from three unique perspectives: <br />\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. <br />\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.</p>\n<p>Español<br />\nRockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización.<br />\nNarración simultánea desde tres perspectivas únicas:<br />\nSigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir.<br />\nGTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
            ],
            _id: "68ac0d7f9ab00c744fbca3c4",
          },
          {
            rawgId: "4200",
            name: "Portal 2",
            description:
              "<p>Portal 2 is a first-person puzzle game developed by Valve Corporation and released on April 19, 2011 on Steam, PS3 and Xbox 360. It was published by Valve Corporation in digital form and by Electronic Arts in physical form. </p>\n<p>Its plot directly follows the first game&#39;s, taking place in the Half-Life universe. You play as Chell, a test subject in a research facility formerly ran by the company Aperture Science, but taken over by an evil AI that turned upon its creators, GladOS. After defeating GladOS at the end of the first game but failing to escape the facility, Chell is woken up from a stasis chamber by an AI personality core, Wheatley, as the unkempt complex is falling apart. As the two attempt to navigate through the ruins and escape, they stumble upon GladOS, and accidentally re-activate her...</p>\n<p>Portal 2&#39;s core mechanics are very similar to the first game&#39;s ; the player must make their way through several test chambers which involve puzzles. For this purpose, they possess a Portal Gun, a weapon capable of creating teleportation portals on white surfaces. This seemingly simple mechanic and its subtleties coupled with the many different puzzle elements that can appear in puzzles allows the game to be easy to start playing, yet still feature profound gameplay. The sequel adds several new puzzle elements, such as gel that can render surfaces bouncy or allow you to accelerate when running on them.</p>\n<p>The game is often praised for its gameplay, its memorable dialogue and writing and its aesthetic. Both games in the series are responsible for inspiring most puzzle games succeeding them, particularly first-person puzzle games. The series, its characters and even its items such as the portal gun and the companion cube have become a cultural icon within gaming communities.</p>\n<p>Portal 2 also features a co-op mode where two players take on the roles of robots being led through tests by GladOS, as well as an in-depth level editor.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
            ],
            _id: "68ac1417c94bfd84b1d2f417",
          },
        ],
        _id: "68a1fced1d1e4c3d21423bc3",
      },
      {
        name: "My Fave Action games",
        games: [
          {
            rawgId: "5679",
            name: "The Elder Scrolls V: Skyrim",
            description:
              "<p>The fifth game in the series, Skyrim takes us on a journey through the coldest region of Cyrodiil. Once again player can traverse the open world RPG armed with various medieval weapons and magic, to become a hero of Nordic legends –Dovahkiin, the Dragonborn. After mandatory character creation players will have to escape not only imprisonment but a fire-breathing dragon. Something Skyrim hasn’t seen in centuries.</p>",
            screenshots: [
              "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
            ],
            _id: "68ac1442c94bfd84b1d2f473",
          },
        ],
        _id: "68a1fd3a1d1e4c3d21423c31",
      },
    ],
    __v: 29,
  },
];

const usersAndUserlistsSeedDatObselete = [
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
