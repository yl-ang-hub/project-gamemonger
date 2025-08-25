import React, { useState, useRef, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

const SearchGames = () => {
  const fetchData = useFetch();
  const nameRef = useRef(null);
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const { query } = useParams();

  console.log("query is", query);

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

  useEffect(() => {
    if (query && nameRef.current) {
      nameRef.current.value = query;
      doSearch();
    }
  }, [query]);

  const handleLink = (e) => {
    e.preventDefault();
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
            return (
              <div key={index}>
                <a href={`/gamepage/${game.id}`}>{game.name}</a>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchGames;
