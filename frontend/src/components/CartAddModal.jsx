import React from "react";
import ReactDOM from "react-dom";
import styles from "./ListModal.module.css";

const OverLay = (props) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="text-center my-3">Item added to cart!</div>

        <div className="row my-3">
          <button
            onClick={() => props.setShowAddToCartModal(false)}
            className="col-md-3 btn btn-primary mx-auto">
            Ok
          </button>
        </div>
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
