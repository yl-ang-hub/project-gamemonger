import React from "react";
import useFetch from "../hooks/useFetch";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const GamePageReviews = (props) => {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);
  const queryClient = useQueryClient();

  const deleteReview = async () => {
    console.log("deleteReview");
    console.log(props.rawgId);
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
      console.log(1);
      queryClient.invalidateQueries(["userReviews", props.rawgId]);
    },
  });

  return (
    <>
      <div className="container justify-content-between border border-dark">
        <div>{props.username}</div>
        <div className="border border-warning">{props.rawgId}</div>
        <div className="border border-info">{props.review}</div>
        <button onClick={mutate.mutate}>Delete</button>
        <br />
      </div>
    </>
  );
};

export default GamePageReviews;
