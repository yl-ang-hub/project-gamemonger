import React, { useState, useEffect } from "react";
import { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useQuery, useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import AuthCtx from "../context/authContext";

const Loginpage = (props) => {
  const authCtx = use(AuthCtx);
  const fetchData = useFetch();
  const [usernameInput, setUsernameInput] = useState("Shrek");
  const [passwordInput, setPasswordInput] = useState("password123");
  const navigate = useNavigate();

  const loginToApp = async () => {
    const res = await fetchData(`/auth/login`, "POST", {
      username: usernameInput.trim(),
      password: passwordInput.trim(),
    });

    try {
      localStorage.setItem("refresh", res.refresh);
      authCtx.setAccessToken(res.access);
      const decoded = jwtDecode(res.access);
      if (decoded) {
        authCtx.setUsername(decoded.username);
        authCtx.setUserId(decoded.id);
      }
      navigate("/user");
    } catch (e) {
      throw "A login error has occurred";
    }
    return true;
  };

  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: loginToApp,
    enabled: false,
    retry: false,
  });

  const refreshAccessToken = async () => {
    const res = await fetchData(`/auth/refresh`, "POST", {
      refresh: localStorage.getItem("refresh"),
    });
    return res;
  };

  const refreshMutate = useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: (data) => {
      try {
        authCtx.setAccessToken(data.access);
        const decoded = jwtDecode(data.access);
        if (decoded) {
          authCtx.setUsername(decoded.username);
          authCtx.setUserId(decoded.id);
        }
        navigate("/user");
      } catch (e) {}
    },
  });

  useEffect(() => {
    // Auto login for users with refresh token in localStorage
    const refresh = localStorage.getItem("refresh");
    if (refresh && refresh !== "undefined") refreshMutate.mutate();
  }, []);

  return (
    <div className="w-50 h-50 mx-auto">
      <div className="card">
        <div className="card-title text-center mt-4 mb-4">
          <h3>Login</h3>
        </div>

        <div className="card-body">
          <label className="col-sm-2" htmlFor="username">
            Username
          </label>
          <input
            className="col-sm-10"
            id="username"
            value={usernameInput}
            onChange={(event) => setUsernameInput(event.target.value)}
          />
          {auth.isError && JSON.stringify(auth.error)}
          {/* // TODO: Display error messages */}
        </div>

        <div className="card-body">
          <label className="col-sm-2" htmlFor="password">
            Password
          </label>
          <input
            className="col-sm-10"
            type="password"
            id="password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
          />
          {/* // TODO: Display error messages */}
        </div>

        <div className="card-body row">
          <div className="col-sm-4" />
          <button className="col-sm-4 btn btn-primary" onClick={auth.refetch}>
            Login
          </button>
          <div className="col-sm-4" />
        </div>

        <div
          className="card-body row text-center"
          style={{ marginTop: "-20px" }}
        >
          <Link to="/registration">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
