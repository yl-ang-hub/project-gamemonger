import React, { useEffect, useRef } from "react";
import { use } from "react";
import AuthCtx from "../context/authContext";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery } from "@tanstack/react-query";

const CheckoutSuccess = () => {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);

  const refreshAccessToken = async () => {
    const res = await fetchData(`/auth/refresh`, "POST", {
      refresh: localStorage.getItem("refresh"),
    });
    try {
      authCtx.setAccessToken(res.access);
      const decoded = jwtDecode(res.access);
      if (decoded) {
        authCtx.setUsername(decoded.username);
        authCtx.setUserId(decoded.id);
      }
    } catch (e) {
      console.log(e.message);
    }
    console.log("got refresh mutation res ", res);
    return res;
  };

  const retrieveSession = async () => {
    console.log(
      "testing the auth before running retrieveSession ",
      authCtx.accessToken
    );
    const session = await fetchData(
      "/checkout",
      "POST",
      { sessionId: localStorage.getItem("sessionId") },
      authCtx.accessToken
    );
    console.log("refetching checkout sess ", JSON.stringify(session));
    return session;
  };

  const refreshMutation = useMutation({
    mutationFn: refreshAccessToken,
  });

  const queryCheckoutSession = useQuery({
    queryKey: ["session"],
    queryFn: retrieveSession,
    enabled: !!authCtx.accessToken,
  });

  const savePurchase = async () => {
    console.log("running savepurchase");
    const res = await fetchData(
      "/checkout/save",
      "PUT",
      {
        userId: authCtx.userId,
        checkoutSessionId: localStorage.getItem("sessionId"),
        amount: queryCheckoutSession.data.amount_total,
        items: queryCheckoutSession.data.line_items,
      },
      authCtx.accessToken
    );

    return res;
  };

  const saveMutation = useMutation({
    mutationFn: savePurchase,
  });

  useEffect(() => {
    refreshMutation.mutate();
    if (
      queryCheckoutSession.data &&
      queryCheckoutSession.data?.status === "complete"
    ) {
      console.log("hello, i am useEffect and query is success");
      saveMutation.mutate();
    }
  }, [queryCheckoutSession.data]);

  return (
    <div
      className="card mx-auto border-0 mt-5"
      style={{
        backgroundColor: "#282c34",
        color: "#e5c07b",
        maxWidth: "70%",
      }}>
      <h3 className="text-center">
        {queryCheckoutSession.isSuccess &&
        queryCheckoutSession.data?.status === "complete"
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

          {saveMutation.isSuccess &&
            saveMutation.data?.items?.data?.map((item, idx) => (
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
          <div className="col-sm-6">
            ${queryCheckoutSession.data?.amount_total / 100}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
