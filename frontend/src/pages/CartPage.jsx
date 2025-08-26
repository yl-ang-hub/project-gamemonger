import React, { useEffect } from "react";
import AuthCtx from "../context/authContext";
import { use } from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);
  const navigate = useNavigate();

  const checkoutSession = async () => {
    console.log("running checkoutSession fn");
    const session = await fetchData(
      "/checkout",
      "PUT",
      { cart: authCtx.cart },
      authCtx.accessToken
    );
    console.log(JSON.stringify(session));
    return session;
  };

  const mutate = useMutation({
    mutationFn: checkoutSession,
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  return (
    <div className="card" style={{ maxWidth: "34%" }}>
      <h3>Your Cart</h3>
      <ul>
        {authCtx.cart.map((item, index) => (
          <li key={index}>
            {item.name} – ${item.price} × {item.quantity}
          </li>
        ))}
      </ul>
      <button type="submit" onClick={mutate.mutate}>
        Check out
      </button>
    </div>
  );
};

export default CartPage;
