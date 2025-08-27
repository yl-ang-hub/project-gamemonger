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
    <div>
      <h3>
        {query.isSuccess && query.data?.status === "complete"
          ? "Purchase Success"
          : "Purchase Failed"}
      </h3>
      <ul className="list-unstyled">
        {mutate.isSuccess &&
          mutate.data?.items?.data?.map((item, index) => (
            <li key={index}>
              {item.description} – ${item.amount_total / 100} × {item.quantity}
            </li>
          ))}
        <li className="fw-bold">Total - ${query.data?.amount_total / 100}</li>
      </ul>
    </div>
  );
};

export default CheckoutSuccess;
