import React, { useState, useRef, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col } from "react-bootstrap";
import chunk from "lodash/chunk";
import Games from "../components/Games";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

const SearchGames = () => {
  const fetchData = useFetch();
  const nameRef = useRef(null);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  let canFetch = true;
  const { query } = useParams();

  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = useState(0); // Current page (0-indexed)

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
    return result;
  };

  useEffect(() => {
    if (query && nameRef.current) {
      nameRef.current.value = query;

      doSearch();
    }
  }, [query]);

  if (!query || query == "") canFetch = false;

  const search = useQuery({
    queryKey: ["search"],
    queryFn: doSearch,
    enabled: canFetch,
    retry: false, // true means it will try 3 times
  });

  const items = search.isSuccess ? search.data.results : [];
  const chunkedItems = chunk(items, 3);

  return (
    <div>
      <input
        ref={nameRef}
        type="text"
        className="col-md-3"
        placeholder="Search for a game..."
      />

      <button onClick={search.refetch} className="col-md-3">
        Search Games
      </button>

      {/* <div>
        {data &&
          data !== "" &&
          data.results?.map((game, index) => {
            return (
              <div key={index}>
                <a href={`/gamepage/${game.id}`}>{game.name}</a>
              </div>
            );
          })}
      </div> */}

      <Container>
        {search.isLoading && <div>Loading...</div>}
        {search.isSuccess &&
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
    </div>
  );
};

export default SearchGames;
