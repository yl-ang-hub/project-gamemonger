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
    const session = await fetchData(
      "/checkout",
      "PUT",
      { cart: authCtx.cart },
      authCtx.accessToken
    );
    return session;
  };

  const mutate = useMutation({
    mutationFn: checkoutSession,
    onSuccess: (data) => {
      localStorage.setItem("sessionId", data.id);
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
