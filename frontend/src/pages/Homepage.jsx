import React from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Games from "../components/Games";

const Homepage = () => {
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
      <div className="container border border-primary">
        {/* {JSON.stringify(query.data)} */}
        {query.isSuccess &&
          query.data.results.map((item) => {
            return (
              <Games
                key={item.id}
                name={item.name}
                background_image={item.background_image}
              />
            );
          })}
      </div>
    </>
  );
};
export default Homepage;
