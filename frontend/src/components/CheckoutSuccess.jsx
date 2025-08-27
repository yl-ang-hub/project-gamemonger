import React, { useEffect, useRef } from "react";
import { use } from "react";
import AuthCtx from "../context/authContext";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery } from "@tanstack/react-query";

const CheckoutSuccess = () => {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);

  const retrieveSession = async () => {
    const session = await fetchData(
      "/checkout",
      "POST",
      { sessionId: localStorage.getItem("sessionId") },
      authCtx.accessToken
    );

    return session;
  };

  const query = useQuery({
    queryKey: ["session"],
    queryFn: retrieveSession,
  });

  const savePurchase = async () => {
    const res = await fetchData("/checkout/save", "PUT", {
      userId: authCtx.userId,
      checkoutSessionId: localStorage.getItem("sessionId"),
      amount: query.data.amount_total,
      items: query.data.line_items,
    });

    return res;
  };

  const mutate = useMutation({
    mutationFn: savePurchase,
  });

  // TODO: retrieve cart from session and payment status

  // TODO: Change to save cart to DB
  useEffect(() => {
    if (query.data && query.data?.status === "complete") {
      mutate.mutate();
    }
  }, [query.data]);

  return (
    <div
      className="card mx-auto border-0 mt-5"
      style={{
        backgroundColor: "#282c34",
        color: "#e5c07b",
        maxWidth: "70%",
      }}>
      <h3 className="text-center">
        {query.isSuccess && query.data?.status === "complete"
          ? "Purchase Success"
          : "Purchase Failed"}
      </h3>
      <div>
        <div className="my-4 align-items-center">
          <div className="row mb-4">
            <div className="col-sm-6">Game</div>
            <div className="col-sm-4">Price</div>
            <div className="col-sm-2">Quantity</div>
          </div>

          {mutate.isSuccess &&
            mutate.data?.items?.data?.map((item, idx) => (
              <div className="row" key={idx}>
                <div className="col-sm-6">{item.description} </div>
                <div className="col-sm-4">${item.amount_total / 100}</div>
                <div className="col-sm-2">{item.quantity}</div>
              </div>
            ))}
        </div>
        <hr />
        <div className="row fw-bold">
          <div className="col-sm-6">Total</div>
          <div className="col-sm-6">${query.data?.amount_total / 100}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
