import React from "react";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import styles from "./UserpageReviews.module.css";
import { FaTrash } from "react-icons/fa";

const UserpageReviews = (props) => {
  const authCtx = use(AuthCtx);
  const queryClient = useQueryClient();
  const fetchData = useFetch();

  const deleteReview = async () => {
    const data = await fetchData(
      "/api/reviews",
      "DELETE",
      { reviewId: props.reviewId },
      authCtx.accessToken
    );
    return data;
  };

  const mutate = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", authCtx.userId]);
    },
  });

  return (
    <>
      <div className="card border border-primary">
        <div className="card-header text-bg-dark">{props.gameName}</div>
        <div className="card-body">
          {/* Rating and Delete Comment button */}
          <div className="row">
            <form className="col-sm-10">
              <fieldset className={styles.rating}>
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  checked={props.rating === 5}
                  disabled
                />
                <label htmlFor="star5">★</label>

                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  checked={props.rating === 4}
                  disabled
                />
                <label htmlFor="star4">★</label>

                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  checked={props.rating === 3}
                  disabled
                />
                <label htmlFor="star3">★</label>

                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  checked={props.rating === 2}
                  disabled
                />
                <label htmlFor="star2">★</label>

                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  checked={props.rating === 1}
                  disabled
                />
                <label htmlFor="star1">★</label>
              </fieldset>
            </form>

            <button
              className="col-sm-1 btn btn-outline-danger fs-6"
              style={{ height: "50px", width: "50px" }}
              onClick={mutate.mutate}
              data-toggle="tooltip"
              title="Delete my comment">
              <FaTrash />
            </button>
          </div>

          {/* Review */}
          <div className="row mt-2 px-3 py-2">{props.review}</div>
        </div>
      </div>
    </>
  );
};

export default UserpageReviews;
