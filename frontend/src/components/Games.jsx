import React from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "../services/rawgService.js";

const Games = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading games</div>;

  return (
    <div>
      {data.results.map((game, index) => (
        <div key={index}>{game.name}</div>
      ))}
    </div>
  );
};

export default Games;
