import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AuthCtx from "../context/authContext";
import { use } from "react";
import AddGameToListModal from "../components/AddGameToListModal";
import GamePageReviews from "../components/GamePageReviews";

const Gamepage = () => {
  const authCtx = use(AuthCtx);
  const { rawgId } = useParams();
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const [showAddGameToListModal, setShowAddGameToListModal] = useState(false);
  const reviewRef = useRef("");

  const getGameDetail = async () => {
    const data = await fetchData("/api/games/" + rawgId, "GET", undefined, undefined);
    return data;
  };
  const queryGameDetail = useQuery({
    queryKey: ["gameDetail", rawgId],
    queryFn: getGameDetail,
  });

  const getGameTrailers = async () => {
    const data = await fetchData("/api/games/trailers/" + rawgId, "GET", undefined, undefined);
    return data;
  };
  const queryGameTrailers = useQuery({
    queryKey: ["gameTrailers", rawgId],
    queryFn: getGameTrailers,
  });

  const getUserReviews = async () => {
    const data = await fetchData("/api/gameReviews", "POST", { rawgId }, undefined);
    return data;
  };
  const queryUserReviews = useQuery({
    queryKey: ["userReviews", rawgId],
    queryFn: getUserReviews,
  });

  const AddUserReview = async () => {
    const data = await fetchData(
      "/api/reviews",
      "POST",
      {
        rating: "4",
        review: reviewRef.current.value,
        rawgId: rawgId,
        userId: authCtx.userId,
      },
      authCtx.accessToken
    );
  };
  const mutate = useMutation({
    mutationFn: AddUserReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["userReviews", rawgId]);
      reviewRef.current.value = "";
    },
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
            {queryGameDetail.isSuccess && (
              <div className=" d-flex">
                <div className="container border border-info">
                  <br />
                  <div className="border border-dark">{queryGameDetail.data.name}</div>
                  <img
                    className="img-fluid"
                    alt={queryGameDetail.data.name}
                    src={queryGameDetail.data.background_image}
                  />

                  <div className="border border-warning">List of Screenshots to click</div>
                  <br />
                </div>
                <div className="container border border-danger">
                  <br />
                  <div className="border border-dark">
                    <div className="border border-primary">
                      Price: $${queryGameDetail.data.price}
                      <button className="btn btn-primary">Add to Cart</button>
                    </div>
                    <div className="border border-secondary">
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowAddGameToListModal(true)}>
                        Add to my list
                      </button>
                    </div>
                  </div>
                  <div className="border border-warning">
                    <div>Released Date: {queryGameDetail.data.released}</div>
                    <div>Rating: {queryGameDetail.data.rating}/5</div>
                    <div>Esrb Rating: {queryGameDetail.data.esrb_rating.name}</div>
                    <div>Genres: {queryGameDetail.data.genres[0].name}</div>
                    <div>
                      Platforms:{" "}
                      {queryGameDetail.data.parent_platforms.map((item, index) => {
                        return (
                          <div className="badge bg-secondary me-1" key={index}>
                            {item.platform.name}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      Stores:{" "}
                      {queryGameDetail.data.stores.map((item, index) => {
                        return (
                          <div className="badge bg-secondary me-1" key={index}>
                            {item.store.name}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      Developers:{" "}
                      {queryGameDetail.data.developers.map((item, index) => {
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
            {queryGameTrailers.isSuccess && (
              <div className="container border border-info">
                <br />
                <video
                  className="w-100"
                  controls
                  src={queryGameTrailers.data.results[0]?.data.max}
                />
                <div className="border border-warning">List of Video to click</div>
                <br />
              </div>
            )}
            <br />
          </div>
          <br />
          {queryGameDetail.isSuccess && (
            <div
              className={`container d-flex flex-wrap gap-2 p-2 overflow-auto scroll-white border border-danger`}
              style={{
                maxHeight: "300px",
                borderRadius: "5px",
              }}>
              <div> This is {queryGameDetail.data.name}.</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: queryGameDetail.data.description,
                }}></div>
            </div>
          )}
        </div>

        <br />
        <div className="container border border-primary">
          <br />
          <div className="container border border-danger">
            <input ref={reviewRef} className="col-sm-10" placeholder="User's review"></input>
            <button className="btn btn-primary" onClick={mutate.mutate}>
              Submit
            </button>
          </div>
          <br />
          <div className="container border border-danger">
            {queryUserReviews.isSuccess &&
              queryUserReviews.data.map((item) => {
                return (
                  <GamePageReviews
                    key={item._id}
                    reviewId={item._id}
                    rawgId={item.rawgId}
                    review={item.review}
                    userId={item.userId}
                    username={item.userId.username}
                  />
                );
              })}
          </div>
          <br />
        </div>
      </div>
    </>
  );
};
export default Gamepage;
