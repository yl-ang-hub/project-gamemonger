import React from "react";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

const UserpageReviews = (props) => {
  const authCtx = use(AuthCtx);
  const queryClient = useQueryClient();
  const fetchData = useFetch();

  const deleteReview = async () => {
    console.log("deleteReview");
    console.log(authCtx.userId);
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
      <div className="container border border-primary">
        <div>Game: {props.gameName}</div>
        <div>Rating: {props.rating}</div>
        <div>ReviewId: {props.reviewId}</div>
        <div>Review: {props.review}</div>
      </div>
      <button onClick={mutate.mutate}>Delete</button>
    </>
  );
};

export default UserpageReviews;
