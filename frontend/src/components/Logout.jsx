import React, { useEffect } from "react";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const authCtx = use(AuthCtx);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("refresh");
    authCtx.setAccessToken("");
    authCtx.setUserId("");
    authCtx.setUsername("");
    navigate("/homepage");
    // to empty all states and contexts for next user
    window.location.reload(true);
  }, []);

  return <></>;
};

export default Logout;
