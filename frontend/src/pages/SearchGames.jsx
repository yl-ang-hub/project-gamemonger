import React, { useState, useRef } from "react";
import useFetch from "../hooks/useFetch";

const SearchGames = () => {
  const fetchData = useFetch();
  const nameRef = useRef("");
  const [data, setData] = useState("");

  const doSearch = async (e) => {
    console.log(nameRef.current.value);
    const result = await fetchData(
      "/api/games/search",
      "POST",
      {
        query: nameRef.current.value,
      },
      undefined
    );
    setData(result);
  };

  return (
    <div>
      <input
        ref={nameRef}
        type="text"
        className="col-md-3"
        placeholder="Search for a game..."
      />

      <button onClick={() => doSearch()} className="col-md-3">
        Search Games
      </button>

      <div>
        {data &&
          data !== "" &&
          data.results?.map((game, index) => {
            return <div>{game.name}</div>;
          })}
      </div>
    </div>
  );
};

export default SearchGames;
