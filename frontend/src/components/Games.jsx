import React from "react";

// import { useQuery } from "@tanstack/react-query";
// import { fetchGames } from "../services/rawgService.js";

const Games = (props) => {
  //   const { data, error, isLoading } = useQuery({
  //     queryKey: ["games"],
  //     queryFn: fetchGames,
  //   });
  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error loading games</div>;
  //   return (
  //     <div>
  //       {data.results.map((game, index) => (
  //         <div key={index}>{game.name}</div>
  //       ))}
  //     </div>
  //   );
  // };
  return (
    <>
      <div className="container border border-danger">
        <div>{props.name}</div>
        <img
          className="img-fluid"
          alt={props.name}
          src={props.background_image}
        />
      </div>
    </>
  );
};
export default Games;
