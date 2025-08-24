import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Gamepage = () => {
  const fetchData = useFetch();
  const queryClient = useQueryClient();

  const getGames = async () => {
    const data = await fetchData("/api/games", "GET", undefined, undefined);
    return data;
  };
  const query = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  return (
    <>
      {/* {JSON.stringify(query.data)} */}
      {query.isSuccess &&
        query.data.results.map((item) => {
          return <div key={item.count}>{item.name}</div>;
        })}
      <div className="container border border-dark">
        <div className="container border border-primary">
          <br />
          <div className=" d-flex">
            <div className="container border border-info">
              <br />
              <div className="border border-dark">Game Logo</div>
              <div className="border border-warning">
                List of Screenshots to click
              </div>
              <br />
            </div>
            <div className="container border border-danger">
              <br />
              <div className="border border-dark">Summary Review</div>
              <div className="border border-warning">Genernal Info</div>
              <br />
            </div>
          </div>
          <br />
          <div className="container border border-info">
            <br />
            <div className="border border-dark">Gameplay Video</div>
            <div className="border border-warning">List of Video to click</div>
            <br />
          </div>
          <br />
        </div>
        <br />
        <div className="container border border-primary">
          <div>Game intro</div>
        </div>
        <br />
        <div className="container border border-primary">
          <br />
          <input className="col-sm-10" placeholder="User's review"></input>
          <button className="btn btn-primary">Submit</button>
          <br />
          <br />
          <div className="container border border-danger">
            <br />
            <div className="container justify-content-between border border-dark">
              User A<div className="border border-warning">Recommended</div>
              <div className="border border-info">Review</div>
              <br />
            </div>
            <br />
            <div className="container justify-content-between border border-dark">
              User B<div className="border border-warning">Recommended</div>
              <div className="border border-info">Review</div>
              <br />
            </div>
            <br />
          </div>
          <br />
        </div>
      </div>
    </>
  );
};
export default Gamepage;
