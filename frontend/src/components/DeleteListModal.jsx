import React from "react";
import ReactDOM from "react-dom";
import styles from "./ListModal.module.css";
import useFetch from "../hooks/useFetch";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const OverLay = (props) => {
  const queryClient = useQueryClient();
  const authCtx = use(AuthCtx);
  const fetchData = useFetch();

  const deleteList = async () => {
    const endpoint = `/lists/${authCtx.userId}/${props.displayedListId}`;
    const res = await fetchData(endpoint, "DELETE", undefined, authCtx.accessToken);
    return true;
  };

  const mutate = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      // TODO: Auto bounce to first list after delete
      // props.setDisplayedListId("");
      // props.setDisplayedListName("");
      props.setShowDeleteListModal(false);
      queryClient.invalidateQueries(["userlists"]);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="text-center my-3">
          Are you sure you want to delete {props.displayedListName}?
        </div>

        <div className="row my-3">
          <div className="col-md-3"></div>
          <button onClick={mutate.mutate} className="col-md-3 btn btn-danger mx-1">
            Delete
          </button>
          <button
            onClick={() => props.setShowDeleteListModal(false)}
            className="col-md-3 btn btn-primary mx-1">
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const DeleteListModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowDeleteListModal={props.setShowDeleteListModal}
          displayedListId={props.displayedListId}
          displayedListName={props.displayedListName}
          setDisplayedListId={props.setDisplayedListId}
          setDisplayedListName={props.setDisplayedListName}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default DeleteListModal;
