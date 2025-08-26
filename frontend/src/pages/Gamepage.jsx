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
// install npm i react-icons
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";

const Gamepage = () => {
  const authCtx = use(AuthCtx);
  const { rawgId } = useParams();
  const fetchData = useFetch();
  const queryClient = useQueryClient();
  const [showAddGameToListModal, setShowAddGameToListModal] = useState(false);
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

      console.log(authCtx.username);
      console.log(newCart);
      return newCart;
    });
  };

  return (
    <>
      {gameName}
      {showAddGameToListModal && (
        <AddGameToListModal
          setShowAddGameToListModal={setShowAddGameToListModal}
          rawgId={rawgId}
        />
      )}

      <div className="container border border-dark">
        <div>
          <div className="container border border-primary">
            <br />
            {queryGameDetail.isSuccess && (
              <div className=" d-flex">
                <div className="container border border-info">
                  <br />
                  <h1 className="border border-dark">
                    {queryGameDetail.data?.name}
                  </h1>
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
                <div className="container border border-danger">
                  <br />
                  <div className="border border-dark">
                    <div className="border border-primary">
                      Price: $${queryGameDetail.data?.price}
                      <button
                        className="btn btn-primary"
                        onClick={handleAddToCart}>
                        Add to Cart
                      </button>
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
                    <div>Released Date: {queryGameDetail.data?.released}</div>
                    <div>Rating: {queryGameDetail.data?.rating}/5</div>
                    <div>
                      Esrb Rating: {queryGameDetail.data?.esrb_rating?.name}
                    </div>
                    <div>
                      {" "}
                      Genres:{" "}
                      {queryGameDetail.data?.genres?.length > 0
                        ? queryGameDetail.data.genres[0].name
                        : "N/A"}
                    </div>
                    <div>
                      Platforms:{" "}
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
                      Stores:{" "}
                      {queryGameDetail.data?.stores?.map((item, index) => {
                        return (
                          <div className="badge bg-secondary me-1" key={index}>
                            {item.store.name}
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      Developers:{" "}
                      {queryGameDetail.data?.developers?.map((item, index) => {
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

            <div className="border border-warning">
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
          </div>
          <br />
          {queryGameDetail.isSuccess && (
            <div
              className={`container d-flex flex-wrap gap-2 p-2 overflow-auto scroll-white border border-danger`}
              style={{
                maxHeight: "300px",
                borderRadius: "5px",
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
        <div className="container border border-primary">
          <br />
          <div className="container border border-danger">
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
            <input
              ref={reviewRef}
              className="col-sm-10"
              placeholder="User's review"></input>
            <button className="btn btn-primary" onClick={mutate.mutate}>
              Submit
            </button>
          </div>
          <br />
          <div className="container border border-danger">
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
