import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { use } from "react";
import AuthCtx from "../context/authContext";
import DeleteListModal from "../components/DeleteListModal";
import RenameListModal from "../components/RenameListModal";
import AddListModal from "../components/AddListModal";
import UserpageReviews from "../components/UserpageReviews";
import UserpagePurchases from "../components/UserpagePurchases";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { BiRename } from "react-icons/bi";
import { Link } from "react-router-dom";

const Userpage = () => {
  const queryClient = useQueryClient();
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);
  const [wishlistId, setWishlistId] = useState("");
  const [displayedListId, setDisplayedListId] = useState("");
  const [displayedListName, setDisplayedListName] = useState("");
  const [showAddListModal, setShowAddListModal] = useState(false);
  const [showRenameListModal, setShowRenameListModal] = useState(false);
  const [showDeleteListModal, setShowDeleteListModal] = useState(false);

  const fetchUserInfo = async () => {
    const data = await fetchData(
      `/user/${authCtx.userId}`,
      undefined,
      undefined,
      authCtx.accessToken
    );
    return data;
  };

  const queryUser = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
  });

  const fetchLists = async () => {
    const data = await fetchData(
      `/lists`,
      "POST",
      {
        userId: authCtx.userId,
      },
      authCtx.accessToken
    );
    setWishlistId(data[0]._id);
    if (displayedListId === "") setDisplayedListId(data[0]._id);
    if (displayedListName === "") setDisplayedListName(data[0].name);
    return data;
  };

  const queryUserlists = useQuery({
    queryKey: ["userlists"],
    queryFn: fetchLists,
  });

  const getDisplayedListGames = (data) => {
    const list = data?.filter((list) => list._id == displayedListId)[0];
    const games = list?.games || [];
    return games;
  };

  const delGame = async (gameId) => {
    await fetchData(
      `/lists/${authCtx.userId}/${displayedListId}/${gameId}`,
      "DELETE",
      undefined,
      authCtx.accessToken
    );
  };

  const mutate = useMutation({
    mutationFn: (gameId) => delGame(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries(["userlists"]);
    },
  });

  const getUserReviews = async () => {
    const userReviews = await fetchData(
      "/api/userGameReviews",
      "POST",
      { userId: authCtx.userId },
      undefined
    );
    return userReviews;
  };
  const queryUserReviews = useQuery({
    queryKey: ["reviews", authCtx.userId],
    queryFn: getUserReviews,
  });

  return (
    <div>
      {showAddListModal && (
        <AddListModal setShowAddListModal={setShowAddListModal} />
      )}

      {showRenameListModal && (
        <RenameListModal
          setShowRenameListModal={setShowRenameListModal}
          setDisplayedListName={setDisplayedListName}
          displayedListId={displayedListId}
          displayedListName={displayedListName}
        />
      )}

      {showDeleteListModal && (
        <DeleteListModal
          setShowDeleteListModal={setShowDeleteListModal}
          displayedListId={displayedListId}
          displayedListName={displayedListName}
          setDisplayedListId={setDisplayedListId}
          setDisplayedListName={setDisplayedListName}
          wishlistId={wishlistId}
        />
      )}

      {/* Show user's name and picture */}
      <div className="mt-3 mb-3">
        <div className="mx-2 my-2" id="userProfile">
          <div>
            <h1>{authCtx.username}</h1>
          </div>
          <div>
            {queryUser.isSuccess && (
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
                src={queryUser.data.picture}
              />
            )}
          </div>
        </div>

        {/* Dropdown option to select one user's list */}
        <div className="mx-2 my-3" id="userLists">
          <label htmlFor="userlists">Select your list -</label>
          <select
            className="mx-2 my-3"
            name="userlists"
            id="userlists"
            onChange={(event) => {
              setDisplayedListId(event.target.value);
              setDisplayedListName(event.target.selectedOptions[0].innerText);
            }}>
            {queryUserlists.data?.map((list) => {
              return (
                <option value={list._id} key={list._id} listname={list.name}>
                  {list.name}
                </option>
              );
            })}
          </select>

          {/* List Name & Add/Edit/Delete buttons */}
          <div
            className="card text-bg-light px-2 py-2"
            style={{ height: "600px" }}>
            {/* List Name & Options */}
            <div className="row mb-3 px-2">
              <h3 className="col fw-bold fs-2">{displayedListName}</h3>
              <button
                className="col-sm-1 btn btn-outline-success fs-5 mx-1"
                style={{ height: "50px", width: "50px" }}
                onClick={() => setShowAddListModal(true)}
                data-toggle="tooltip"
                title="Add new list">
                <IoMdAddCircle />
              </button>

              <button
                className="col-sm-1 btn btn-outline-primary fs-5 mx-1"
                style={{ height: "50px", width: "50px" }}
                onClick={() => setShowRenameListModal(true)}
                data-toggle="tooltip"
                title="Rename my list">
                <BiRename />
              </button>

              <button
                className="col-sm-1 btn btn-outline-danger fs-6 mx-1"
                style={{ height: "50px", width: "50px" }}
                onClick={() => setShowDeleteListModal(true)}
                data-toggle="tooltip"
                title="Delete my list">
                <FaTrash />
              </button>
            </div>

            {/* List of Games */}
            <div className="overflow-scroll">
              {queryUserlists.isSuccess &&
                displayedListId !== "" &&
                getDisplayedListGames(queryUserlists?.data).map((game) => {
                  return (
                    <Link
                      key={game._id}
                      to={`/gamepage/${game.rawgId}`}
                      className="text-reset text-decoration-none">
                      <div className="card text-bg-light text-center my-1">
                        <div className="card-header text-bg-dark fw-bold">
                          {game.name}
                        </div>
                        <div className="row px-1 py-2">
                          <div className="col-sm-4" id="game-img">
                            {game.screenshots.map((img, idx) => (
                              <li key={idx}>
                                <img
                                  src={img}
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "120%",
                                  }}
                                />
                              </li>
                            ))}
                          </div>

                          <div className="col-sm-1"> </div>

                          <div className="col-sm-7" id="game-desc">
                            <div className="row text-start fs-6">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: game.description,
                                }}
                              />
                            </div>
                            <div className="row">
                              <button
                                className="col-sm-1 offset-sm-10 btn btn-outline-danger mb-3"
                                style={{ height: "50px", width: "50px" }}
                                onClick={(event) => {
                                  event.preventDefault();
                                  mutate.mutate(game._id);
                                }}>
                                <FaTrash />
                              </button>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>

        {/* User's purchases */}
        <div className="card mx-2 my-2 px-2 py-2">
          <h3 className="fw-bold fs-2">Recent Purchases</h3>
          <UserpagePurchases />
        </div>

        {/* User's reviews */}
        <div className="card mx-2 my-2 px-2 py-2" id="userComments">
          <h3 className="fw-bold fs-2">My Comments</h3>
          {queryUserReviews.isSuccess &&
            queryUserReviews.data.map((item) => {
              return (
                <UserpageReviews
                  rawgId={item.rawgId}
                  gameName={item.gameName}
                  reviewId={item._id}
                  review={item.review}
                  rating={item.rating}
                  key={item._id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Userpage;
