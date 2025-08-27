import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ListModal.module.css";

const OverLay = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.setShowAddToCartModal(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="text-center my-auto">Item added to cart!</div>
      </div>
    </div>
  );
};

const CartAddModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay setShowAddToCartModal={props.setShowAddToCartModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CartAddModal;
