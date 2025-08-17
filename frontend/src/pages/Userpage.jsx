import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const Userpage = () => {
  const [displayedList, setDisplayedList] = useState("");

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/user/68a0cc104bc0904a639c915a`
      );
      if (!res.ok) {
        throw new Error("Request error");
      }
      return await res.json();
    } catch (error) {
      console.log(error, error.message);
    }
  };

  const queryUsername = useQuery({
    queryKey: ["username"],
    queryFn: fetchUser,
  });

  const fetchLists = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/user/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "68a0cc104bc0904a639c915a",
        }),
      });
      if (!res.ok) {
        throw new Error("Request error");
      }
      const data = await res.json();
      setDisplayedList(data[0]._id);
      return data;
    } catch (error) {
      console.log(error, error.message);
    }
  };

  const queryListsForUser = useQuery({
    queryKey: ["queryListsForUser"],
    queryFn: fetchLists,
  });

  const getDisplayedListGames = () => {
    const list = queryListsForUser.data?.filter(
      (list) => list._id == displayedList
    )[0];
    console.log(list);
    const games = list.games;
    console.log(games);
    return games;
  };

  return (
    <div className="ms-3 mt-3">
      <div className="mx-2 my-2" id="userProfile">
        <div>
          {queryUsername.isSuccess && <h1>{queryUsername.data.username}</h1>}
        </div>
        <div>
          {queryUsername.isSuccess && (
            <img
              style={{ maxHeight: "200px" }}
              src={queryUsername.data.picture}
            />
          )}
        </div>
      </div>

      <div className="mx-2 my-2" id="userLists">
        <label htmlFor="userlists">Select your list -</label>
        <select
          className="mx-2"
          name="userlists"
          id="userlists"
          onChange={(event) => setDisplayedList(event.target.value)}
        >
          {queryListsForUser.data?.map((list) => {
            return (
              <option value={list._id} key={list._id}>
                {list.name}
              </option>
            );
          })}
        </select>
        <div className="card overflow-scroll px-2" style={{ height: "400px" }}>
          {queryListsForUser.isSuccess &&
            displayedList !== "" &&
            getDisplayedListGames().map((game) => {
              return (
                <div className="card text-center my-1" key={game._id}>
                  <div className="card-header fw-bold">{game.name}</div>
                  <ul className="list-unstyled">
                    <li>Description: {game.description}</li>
                    {game.screenshots.map((img, idx) => (
                      <li key={idx}>{img}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>

      <div className="card mx-2 my-2" id="userComments">
        List of all comments posted by users on different games
      </div>
    </div>
  );
};

export default Userpage;

const fetchListsData = [
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
];
