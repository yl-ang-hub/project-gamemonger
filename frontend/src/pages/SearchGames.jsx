import React, { useState, useRef, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col } from "react-bootstrap";
import chunk from "lodash/chunk";
import Games from "../components/Games";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
import css from "../components/ListModal.module.css";
const SearchGames = () => {
  const fetchData = useFetch();
  const nameRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  let canFetch = true;
  const { query } = useParams();

  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = useState(0); // Current page (0-indexed)

  const doSearch = async (e) => {
    const params = new URLSearchParams({
      page: currentPage + 1,
      search: searchTerm,
    });

    let curURI = `/api/games/search?${params.toString()}`;
    const result = await fetchData(
      curURI,
      "POST",
      {
        query: searchTerm,
      },
      undefined
    );
    return result;
  };

  useEffect(() => {
    if (query && nameRef.current) {
      nameRef.current.value = query;
      setSearchTerm(query);
    }
  }, [query]);

  if (!query || query == "") canFetch = false;

  const search = useQuery({
    queryKey: ["search", searchTerm, currentPage],
    queryFn: doSearch,
    enabled: canFetch && searchTerm !== "",
    retry: false, // true means it will try 3 times
  });

  useEffect(() => {
    if (search.isSuccess && search.data && search.data.count) {
      setPageCount(Math.ceil(search.data.count / 20)); // 20 is your items per page
    }
  }, [search.data, search.isSuccess]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const items = search.isSuccess ? search.data.results : [];
  const chunkedItems = chunk(items, 3);

  return (
    <div className="containers">
      <input
        ref={nameRef}
        type="text"
        className="col-md-3"
        style={{ display: "none" }}
        placeholder="Search for a game..."
      />

      <button
        onClick={() => {
          setSearchTerm(nameRef.current.value);
          setCurrentPage(0);
        }}
        className={`col-md-3 ${css.Button}`}
        style={{ display: "none" }}>
        Search Games
      </button>

      <Container>
        {search.isLoading && <div>Loading...</div>}
        <br />
        <div
          className={`container overflow-auto ${styles.scrollWhite}`}
          style={{
            maxHeight: "600px",
            border: "2px solid #56b6c2",
            borderRadius: 10,
          }}>
          {search.isSuccess &&
            chunkedItems.map((chunk, chunkIndex) => (
              <Row className="my-3" key={chunkIndex}>
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
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount} // Total number of pages
          marginPagesDisplayed={2} // How many pages to show at the beginning and end
          pageRangeDisplayed={3} // How many pages to show around the current page
          onPageChange={handlePageClick} // What happens when a page is clicked
          containerClassName={styles.pagination} // CSS class for the pagination container
          activeClassName={styles.active} // CSS class for the active page
        />
      </Container>
    </div>
  );
};

export default SearchGames;
