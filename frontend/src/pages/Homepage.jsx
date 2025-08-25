import React from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Games from "../components/Games";
import { Container, Row, Col } from "react-bootstrap";
import chunk from "lodash/chunk";

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

  const items = query.isSuccess ? query.data.results : [];
  const chunkedItems = chunk(items, 3);

  return (
    <Container>
      {query.isLoading && <div>Loading...</div>}
      {query.isSuccess &&
        chunkedItems.map((chunk, chunkIndex) => (
          <Row key={chunkIndex}>
            {chunk.map((item) => (
              <Col key={item.id} md={4}>
                <Games
                  rawgId={item.id}
                  name={item.name}
                  background_image={item.background_image}
                />
              </Col>
            ))}
          </Row>
        ))}
    </Container>
  );

  // return (
  //   <>
  //     <div className="container border border-primary">
  //       {/* {JSON.stringify(query.data)} */}
  //       {query.isSuccess &&
  //         query.data.results.map((item, index) => {
  //           return (
  //             <Games
  //               key={item.id}
  //               rawgId={item.id}
  //               name={item.name}
  //               background_image={item.background_image}
  //             />
  //           );
  //         })}
  //     </div>
  //   </>
  // );
};
export default Homepage;
