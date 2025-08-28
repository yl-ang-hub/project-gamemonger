import React from "react";
import useFetch from "../hooks/useFetch";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./GamePageReviews.module.css";
import { FaTrash } from "react-icons/fa";

const GamePageReviews = (props) => {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);
  const queryClient = useQueryClient();
  const isAuthenticated = authCtx.accessToken.length > 0;

  const deleteReview = async () => {
    const data = await fetchData(
      "/api/reviews",
      "DELETE",
      { reviewId: props.reviewId, userId: authCtx.userId },
      authCtx.accessToken
    );

    return data;
  };

  const mutate = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["userReviews", props.rawgId]);
    },
  });

  return (
    <>
      <div
        className="container d-flex justify-content-between align-items-baseline"
        style={{ border: "2px solid #56b6c2", borderRadius: 10 }}>
        <div className="d-flex gap-3 align-items-baseline flex-grow-1">
          <div>{props.username}'s review:</div>
          <div>
            Rating:{" "}
            {[...Array(5)].map((_, idx) => (
              <span
                key={idx}
                style={{
                  color: idx < props.rating ? "gold" : "#ccc",
                  fontSize: "1.5rem",
                }}>
                ★
              </span>
            ))}
          </div>

          <div>
            "<em>{props.review}</em>"
          </div>
        </div>
        {isAuthenticated && (
          <button className={styles.reviewButton} onClick={mutate.mutate}>
            <FaTrash />
          </button>
        )}
        <br />
      </div>

      <br />
    </>
  );
};

export default GamePageReviews;
