import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ListModal.module.css";
import useFetch from "../hooks/useFetch";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const OverLay = (props) => {
  const queryClient = useQueryClient();
  const authCtx = use(AuthCtx);
  const fetchData = useFetch();

  const fetchLists = async () => {
    return await fetchData(
      `/lists`,
      "POST",
      { userId: authCtx.userId },
      authCtx.accessToken
    );
  };

  const queryUserlists = useQuery({
    queryKey: ["userlists"],
    queryFn: fetchLists,
  });

  const gameDetail = queryClient.getQueryData(["gameDetail", props.rawgId]);
  const [listId, setListId] = useState(queryUserlists.data?.[0]?._id);

  const addGame = async () => {
    const res = await fetchData(
      "/lists/game",
      "PUT",
      {
        userId: authCtx.userId,
        listId: listId,
        rawgId: props.rawgId,
        name: gameDetail.name,
        description: gameDetail.description,
        screenshot: gameDetail.background_image,
      },
      authCtx.accessToken
    );
    return true;
  };

  const mutate = useMutation({
    mutationFn: addGame,
    onSuccess: () => {
      queryClient.invalidateQueries(["userlists"]);
      props.setShowAddGameToListModal(false);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="container text-center my-3">
          {/* Dropdown selection of user's lists */}
          <label htmlFor="userlists">Select your list</label>
          <select
            className={`mx-2 form-select ${styles.themedSelect}`}
            name="userlists"
            id="userlists"
            onChange={(event) => {
              setListId(event.target.value);
            }}>
            {queryUserlists.data?.map((list) => {
              return (
                <option value={list._id} key={list._id} listname={list.name}>
                  {list.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="row my-3">
          <div className="col-md-3"></div>
          <button
            onClick={mutate.mutate}
            className={`col-md-3 ${styles.Button} mx-1`}>
            Add
          </button>
          <button
            onClick={() => props.setShowAddGameToListModal(false)}
            className={`col-md-3 ${styles.Button} mx-1`}>
            Cancel
          </button>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

const AddGameToListModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          setShowAddGameToListModal={props.setShowAddGameToListModal}
          rawgId={props.rawgId}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default AddGameToListModal;
