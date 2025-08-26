import React from "react";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const authCtx = use(AuthCtx);

  localStorage.removeItem("refresh");
  authCtx.setAccessToken("");
  authCtx.setUserId("");
  authCtx.setUsername("");

  return <Navigate to="/homepage" replace />;
};

export default Logout;
