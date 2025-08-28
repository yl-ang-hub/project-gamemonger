import React, { useEffect, useState } from "react";
import AuthCtx from "../context/authContext";
import { use } from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "../components/ListModal.module.css";
import { FaTrash } from "react-icons/fa";

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

  const delFromCart = (event) => {
    const newCart = authCtx.cart.toSpliced(event.target.id, 1);
    authCtx.setCart(newCart);
  };

  return (
    <>
      <br />
      <div
        className="card mx-auto border-0"
        style={{
          backgroundColor: "#282c34",
          color: "#e5c07b",
          maxWidth: "70%",
        }}>
        <h3 className="text-center">Your Cart</h3>
        <div>
          {authCtx.cart.map((item, index) => (
            <div className="d-flex my-4 align-items-center" key={index}>
              <div className="col">
                {item.name} – ${item.price} × {item.quantity}
              </div>
              <div>
                <button
                  className={`${styles.Button}`}
                  style={{ height: "50px", width: "50px" }}
                  id={index}
                  onClick={delFromCart}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.Button} type="submit" onClick={mutate.mutate}>
          Check out
        </button>
      </div>
    </>
  );
};

export default CartPage;
