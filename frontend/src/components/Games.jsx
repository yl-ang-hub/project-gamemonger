import React from "react";
import { useNavigate } from "react-router-dom";

// import { useQuery } from "@tanstack/react-query";
// import { fetchGames } from "../services/rawgService.js";

const Games = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/gamepage/${props.rawgId}`);
  };

  return (
    <>
      <div className="container text-center">
        <div>{props.name}</div>
        <img
          className="img-fluid"
          alt={props.name}
          src={props.background_image}
          onClick={handleClick}
        />
      </div>
    </>
  );
};
export default Games;
