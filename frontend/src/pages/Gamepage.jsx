import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AuthCtx from "../context/authContext";
import { use } from "react";
import AddGameToListModal from "../components/AddGameToListModal";
import GamePageReviews from "../components/GamePageReviews";
import styles from "./Gamepage.module.css";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import CartAddModal from "../components/CartAddModal";

const Gamepage = () => {
  const authCtx = use(AuthCtx);
  const isAuthenticated = authCtx.accessToken.length > 0;
  const { rawgId } = useParams();
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const [showAddGameToListModal, setShowAddGameToListModal] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const reviewRef = useRef("");
  const [rating, setRating] = useState("");
  const [slide, setSlide] = useState(0);
  const [gameName, setGameName] = useState("");

  const getGameDetail = async () => {
    const data = await fetchData(
      "/api/game/" + rawgId,
      "GET",
      undefined,
      undefined
    );
    return data;
  };
  const queryGameDetail = useQuery({
    queryKey: ["gameDetail", rawgId],
    queryFn: getGameDetail,
  });
  useEffect(() => {
    if (queryGameDetail.isSuccess) setGameName(queryGameDetail.data.name);
  }, [queryGameDetail.isSuccess]);

  const getGameTrailers = async () => {
    const data = await fetchData(
      "/api/games/trailers/" + rawgId,
      "GET",
      undefined,
      undefined
    );
    return data;
  };
  const queryGameTrailers = useQuery({
    queryKey: ["gameTrailers", rawgId],
    queryFn: getGameTrailers,
  });

  const getUserReviews = async () => {
    const data = await fetchData(
      "/api/gameReviews",
      "POST",
      { rawgId },
      undefined
    );
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
        rating: rating,
        review: reviewRef.current.value,
        rawgId: rawgId,
        gameName: gameName,
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

  const getGameScreenShots = async () => {
    const data = await fetchData(
      "/api/games/screenshots/" + rawgId,
      "GET",
      undefined,
      undefined
    );
    return data;
  };
  const queryGameScreenShots = useQuery({
    queryKey: ["gameScreenShots", rawgId],
    queryFn: getGameScreenShots,
  });

  const nextSlide = () => {
    setSlide((prev) =>
      prev === queryGameScreenShots.data.results.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setSlide((prev) =>
      prev === 0 ? queryGameScreenShots.data.results.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    authCtx.setCart((prevState) => {
      const newCart = [...prevState];
      newCart.push({
        rawgId: rawgId,
        name: queryGameDetail.data.name,
        price: queryGameDetail.data.price,
        quantity: 1,
      });
      return newCart;
    });
    setShowAddToCartModal(true);
  };

  return (
    <>
      {showAddGameToListModal && (
        <AddGameToListModal
          setShowAddGameToListModal={setShowAddGameToListModal}
          rawgId={rawgId}
        />
      )}

      {showAddToCartModal && (
        <CartAddModal setShowAddToCartModal={setShowAddToCartModal} />
      )}

      <div className="container border border-dark">
        <div>
          <br />
          <div
            className="container"
            style={{ border: "2px solid #56b6c2", borderRadius: 10 }}>
            <div className="container">
              <br />
              {queryGameDetail.isSuccess && (
                <div className=" d-flex">
                  <div className="container">
                    <br />
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ fontSize: "2rem" }}>
                        {queryGameDetail.data?.name}
                      </div>
                      {isAuthenticated && (
                        <button
                          className={styles.actionButton2}
                          onClick={() => setShowAddGameToListModal(true)}>
                          <FaHeart className="d-flex align-items-centers" />
                        </button>
                      )}
                    </div>
                    <img
                      className="img-fluid"
                      alt={queryGameDetail.data?.name}
                      src={queryGameDetail.data?.background_image}
                    />

                    <div className={styles.carousel}>
                      <BsArrowLeftCircleFill
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={prevSlide}
                      />
                      {queryGameScreenShots.isSuccess &&
                        queryGameScreenShots.data.results.map((item, idx) => {
                          return (
                            <img
                              src={item.image}
                              alt={queryGameDetail.data?.name}
                              key={idx}
                              className={
                                slide === idx
                                  ? styles.slide
                                  : styles.slideHidden
                              }
                            />
                          );
                        })}
                      <BsArrowRightCircleFill
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={nextSlide}
                      />
                      <span className={styles.indicators}>
                        {queryGameScreenShots.isSuccess &&
                          queryGameScreenShots.data.results.map((_, idx) => {
                            return (
                              <button
                                className={
                                  slide === idx
                                    ? styles.indicator
                                    : `${styles.indicator} ${styles.indicatorInactive}`
                                }
                                key={idx}
                                onClick={() => setSlide(idx)}></button>
                            );
                          })}
                      </span>
                    </div>
                    <br />
                  </div>
                  <div className="p-2">
                    <br />
                    <div className="container d-flex justify-content-between align-items-center">
                      <span>
                        <span style={{ color: "#e5c07b" }}>Price:</span> $
                        {queryGameDetail.data?.price}
                      </span>
                      {isAuthenticated && (
                        <button
                          className={`d-flex align-items-center ${styles.actionButton}`}
                          onClick={handleAddToCart}>
                          <FaShoppingCart className="d-flex align-items-centers" />
                        </button>
                      )}
                    </div>

                    <div className="container">
                      <div>
                        <span style={{ color: "#e5c07b" }}>Released Date:</span>{" "}
                        {queryGameDetail.data?.released}
                      </div>
                      <div>
                        <span style={{ color: "#e5c07b" }}>Rating: </span>
                        {queryGameDetail.data?.rating}/5
                      </div>
                      <div>
                        <span style={{ color: "#e5c07b" }}>Esrb Rating: </span>
                        {queryGameDetail.data?.esrb_rating?.name}
                      </div>
                      <div>
                        <span style={{ color: "#e5c07b" }}>Genres: </span>
                        {queryGameDetail.data?.genres?.length > 0
                          ? queryGameDetail.data.genres[0].name
                          : "N/A"}
                      </div>
                      <div>
                        <span style={{ color: "#e5c07b" }}>Platforms: </span>
                        {queryGameDetail.data?.parent_platforms?.map(
                          (item, index) => {
                            return (
                              <div
                                className="badge bg-secondary me-1"
                                key={index}>
                                {item.platform.name}
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div>
                        <span style={{ color: "#e5c07b" }}>Stores: </span>
                        {queryGameDetail.data?.stores?.map((item, index) => {
                          return (
                            <div
                              className="badge bg-secondary me-1"
                              key={index}>
                              {item.store.name}
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <span style={{ color: "#e5c07b" }}>Developers: </span>
                        {queryGameDetail.data?.developers?.map(
                          (item, index) => {
                            return (
                              <div
                                className="badge bg-secondary me-1"
                                key={index}>
                                {item.name}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              )}
            </div>
            <div className="container" style={{ borderRadius: 10 }}>
              {queryGameTrailers.isSuccess &&
                Array.isArray(queryGameTrailers.data?.results) &&
                queryGameTrailers.data.results.length > 0 && (
                  <div className={styles.carousel}>
                    <BsArrowLeftCircleFill
                      className={`${styles.arrow} ${styles.arrowLeft}`}
                      onClick={prevSlide}
                    />
                    {queryGameTrailers.data?.results.map((item, idx) => {
                      return (
                        <video
                          controls
                          src={item.data?.max}
                          alt={queryGameDetail.data?.name}
                          key={idx}
                          className={
                            slide === idx ? styles.slide : styles.slideHidden
                          }
                        />
                      );
                    })}
                    <BsArrowRightCircleFill
                      className={`${styles.arrow} ${styles.arrowRight}`}
                      onClick={nextSlide}
                    />
                    <span className={styles.indicators}>
                      {queryGameScreenShots.data?.results?.map((_, idx) => {
                        return (
                          <button
                            className={
                              slide === idx
                                ? styles.indicator
                                : `${styles.indicator} ${styles.indicatorInactive}`
                            }
                            key={idx}
                            onClick={() => setSlide(idx)}></button>
                        );
                      })}
                    </span>
                  </div>
                )}
            </div>
            <br />
          </div>
          <br />
          {queryGameDetail.isSuccess && (
            <div
              className={`container d-flex flex-wrap gap-2 p-2 overflow-auto ${styles.scrollWhite}`}
              style={{
                maxHeight: "300px",
                border: "2px solid #56b6c2",
                borderRadius: 10,
              }}>
              <div> This is {queryGameDetail.data?.name}.</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: queryGameDetail.data?.description,
                }}></div>
            </div>
          )}
        </div>

        <br />
        <div
          className="container"
          style={{ border: "2px solid #56b6c2", borderRadius: 10 }}>
          <br />
          {isAuthenticated && (
            <div className="container">
              <form>
                <div>Rate this game:</div>
                <fieldset
                  className={styles.rating}
                  onChange={(e) => setRating(e.target.value)}>
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label htmlFor="star5">★</label>

                  <input type="radio" id="star4" name="rating" value="4" />
                  <label htmlFor="star4">★</label>

                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3">★</label>

                  <input type="radio" id="star2" name="rating" value="2" />
                  <label htmlFor="star2">★</label>

                  <input type="radio" id="star1" name="rating" value="1" />
                  <label htmlFor="star1">★</label>
                </fieldset>
              </form>

              <div className="d-flex justify-content-between align-items-center gap-2">
                <input
                  ref={reviewRef}
                  className={`col-sm-10 ${styles.reviewInput}`}
                  placeholder="User's review"></input>
                <button className={styles.reviewButton} onClick={mutate.mutate}>
                  Submit
                </button>
              </div>
            </div>
          )}
          <br />
          <div className="container ">
            {queryUserReviews.isSuccess &&
              queryUserReviews.data?.map((item) => {
                return (
                  <GamePageReviews
                    key={item._id}
                    reviewId={item._id}
                    rawgId={item.rawgId}
                    review={item.review}
                    rating={item.rating}
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
