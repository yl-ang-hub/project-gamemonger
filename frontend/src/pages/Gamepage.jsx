import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AuthCtx from "../context/authContext";
import { use } from "react";
import AddGameToListModal from "../components/AddGameToListModal";

const Gamepage = () => {
  const authCtx = use(AuthCtx);
  const { rawgId } = useParams();
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const [showAddGameToListModal, setShowAddGameToListModal] = useState(false);

  const getGameDetail = async () => {
    const data = await fetchData("/api/games/" + rawgId, "GET", undefined, undefined);
    return data;
  };
  const query = useQuery({
    queryKey: ["gameDetail", rawgId],
    queryFn: getGameDetail,
  });

  const getGameTrailers = async () => {
    const data = await fetchData("/api/games/trailers/" + rawgId, "GET", undefined, undefined);
    return data;
  };
  const query2 = useQuery({
    queryKey: ["gameTrailers", rawgId],
    queryFn: getGameTrailers,
  });

  return (
    <>
      {showAddGameToListModal && (
        <AddGameToListModal setShowAddGameToListModal={setShowAddGameToListModal} rawgId={rawgId} />
      )}

      <div className="container border border-dark">
        <div>
          <div className="container border border-primary">
            <br />
            {query.isSuccess && (
              <div className=" d-flex">
                <div className="container border border-info">
                  <br />
                  <div className="border border-dark">{query.data.name}</div>
                  <img
                    className="img-fluid"
                    alt={query.data.name}
                    src={query.data.background_image}
                  />

                  <div className="border border-warning">List of Screenshots to click</div>
                  <br />
                </div>
                <div className="container border border-danger">
                  <br />
                  <div className="border border-dark">
                    <div className="border border-primary">Add to shopping cart</div>
                    <div className="border border-secondary">
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowAddGameToListModal(true)}>
                        Add to my list
                      </button>
                    </div>
                  </div>
                  <div className="border border-warning">
                    <div>Released Date: {query.data.released}</div>
                    <div>Rating: {query.data.rating}/5</div>
                    <div>Esrb Rating: {query.data.esrb_rating.name}</div>
                    <div>Genres: {query.data.genres[0].name}</div>
                    <div>
                      Platforms:{" "}
                      {query.data.parent_platforms.map((item, index) => {
                        return (
                          <div className="badge bg-secondary me-1" key={index}>
                            {item.platform.name}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      Stores:{" "}
                      {query.data.stores.map((item, index) => {
                        return (
                          <div className="badge bg-secondary me-1" key={index}>
                            {item.store.name}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      Developers:{" "}
                      {query.data.developers.map((item, index) => {
                        return (
                          <div className="badge bg-secondary me-1" key={index}>
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            )}
            <br />
            {JSON.stringify(query2.data)}
            {query2.isSuccess && (
              <div className="container border border-info">
                <br />
                <video className="w-100" controls src={query2.data.results[0]?.data.max} />
                <div className="border border-warning">List of Video to click</div>
                <br />
              </div>
            )}
            <br />
          </div>
          <br />
          {query.isSuccess && (
            <div
              className={`container d-flex flex-wrap gap-2 p-2 overflow-auto scroll-white border border-danger`}
              style={{
                maxHeight: "300px",
                borderRadius: "5px",
              }}>
              <div> This is {query.data.name}.</div>
              <div dangerouslySetInnerHTML={{ __html: query.data.description }}></div>
            </div>
          )}
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
