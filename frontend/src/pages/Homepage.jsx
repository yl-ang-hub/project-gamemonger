import React, { useState } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Games from "../components/Games";
import { Container, Row, Col } from "react-bootstrap";
import chunk from "lodash/chunk";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

const Homepage = () => {
  const fetchData = useFetch();

  const queryClient = useQueryClient();
  const [pageCount, setPageCount] = useState(0); // Total number of pages
  const [currentPage, setCurrentPage] = useState(0); // Current page (0-indexed)

  const params = new URLSearchParams({ page: currentPage + 1 });
  let curURI = `/api/games?${params.toString()}`;

  const itemsPerPage = 20; // Number of items per page

  const getGames = async () => {
    const data = await fetchData(curURI, "GET", undefined, undefined);
    const totalItems = data.count;

    setPageCount(Math.ceil(totalItems / itemsPerPage));

    return data;
  };
  const query = useQuery({
    queryKey: ["games", currentPage],
    queryFn: getGames,
  });

  const items = query.isSuccess ? query.data.results : [];
  const chunkedItems = chunk(items, 3);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

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
  );
};
export default Homepage;
