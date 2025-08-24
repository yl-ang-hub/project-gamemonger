import React, { useState } from "react";
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
  const [listName, setListName] = useState(props.displayedListName);

  const renameList = async () => {
    const res = await fetchData(
      "/lists",
      "PATCH",
      {
        userId: authCtx.userId,
        listId: props.displayedListId,
        listName: listName,
      },
      authCtx.accessToken
    );
    return true;
  };

  const mutate = useMutation({
    mutationFn: renameList,
    onSuccess: () => {
      props.setDisplayedListName(listName);
      queryClient.invalidateQueries(["userlists"]);
      props.setShowRenameListModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="text-center my-3">
          <label>Name: </label>
          <input value={listName} onChange={(event) => setListName(event.target.value)} />
        </div>

        <div className="row my-3">
          <div className="col-md-3"></div>
          <button onClick={mutate.mutate} className="col-md-3 btn btn-danger mx-1">
            Rename
          </button>
          <button
            onClick={() => props.setShowRenameListModal(false)}
            className="col-md-3 btn btn-primary mx-1">
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const RenameListModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowRenameListModal={props.setShowRenameListModal}
          setDisplayedListName={props.setDisplayedListName}
          displayedListId={props.displayedListId}
          displayedListName={props.displayedListName}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default RenameListModal;
