import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { use } from "react";
import AuthCtx from "../context/authContext";
import DeleteListModal from "../components/DeleteListModal";
import RenameListModal from "../components/RenameListModal";
import AddListModal from "../components/AddListModal";
import UserpageReviews from "../components/UserpageReviews";

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
    <>
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

      <div className="ms-3 mt-3">
        <div className="mx-2 my-2" id="userProfile">
          <div>
            <h1>{authCtx.username}</h1>
          </div>
          <div>
            {queryUser.isSuccess && (
              <img
                style={{ maxHeight: "200px" }}
                src={queryUser.data.picture}
              />
            )}
          </div>
        </div>

        <div className="mx-2 my-2" id="userLists">
          <label htmlFor="userlists">Select your list -</label>
          <select
            className="mx-2"
            name="userlists"
            id="userlists"
            onChange={(event) => {
              setDisplayedListId(event.target.value);
              setDisplayedListName(event.target.selectedOptions[0].innerText);
            }}
          >
            {queryUserlists.data?.map((list) => {
              return (
                <option value={list._id} key={list._id} listname={list.name}>
                  {list.name}
                </option>
              );
            })}
          </select>

          <div
            className="card overflow-scroll px-2"
            style={{ height: "400px" }}
          >
            {/* List Name & Options */}
            <div className="row">
              <h3 className="col">{displayedListName}</h3>
              <button
                className="col-sm-2 btn btn-primary"
                onClick={() => setShowAddListModal(true)}
              >
                Add List
              </button>
              <button
                className="col-sm-2 btn btn-primary"
                onClick={() => setShowRenameListModal(true)}
              >
                Rename List
              </button>
              <button
                className="col-sm-2 btn btn-warning"
                onClick={() => setShowDeleteListModal(true)}
              >
                Delete List
              </button>
            </div>

            {/* List of Games */}
            <div>
              {queryUserlists.isSuccess &&
                displayedListId !== "" &&
                getDisplayedListGames(queryUserlists?.data).map((game) => {
                  return (
                    <div className="card text-center my-1" key={game._id}>
                      <div className="card-header fw-bold">{game.name}</div>

                      <div className="row">
                        <div className="col-sm-4" id="game-img">
                          {game.screenshots.map((img, idx) => (
                            <li key={idx}>
                              <img
                                src={img}
                                style={{ maxHeight: "100%", maxWidth: "120%" }}
                                alt={game.name}
                              />
                            </li>
                          ))}
                        </div>

                        <div className="col-sm-1"> </div>

                        <div className="col-sm-7" id="game-desc">
                          <div className="row text-start">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: game.description,
                              }}
                            />
                          </div>
                          <div className="row">
                            <button
                              className="col-sm-4 offset-sm-7 btn btn-primary mb-3"
                              onClick={() => mutate.mutate(game._id)}
                            >
                              Delete game from my list
                            </button>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="card mx-2 my-2" id="userComments">
          <h3>Recent Purchases</h3>
        </div>

        <div className="card mx-2 my-2" id="userComments">
          <h3>My Comments</h3>
          {queryUserReviews.isSuccess &&
            queryUserReviews.data.map((item) => {
              return (
                <UserpageReviews
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
    </>
  );
};

export default Userpage;
