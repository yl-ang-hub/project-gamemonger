import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useMutation } from "@tanstack/react-query";

const Registration = () => {
  const fetchData = useFetch();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("password123");
  const navigate = useNavigate();

  const registerForApp = async () => {
    const res = await fetchData(`/auth/register`, "PUT", {
      username: usernameInput.trim(),
      password: passwordInput.trim(),
    });

    return true;
  };

  const register = useMutation({
    mutationFn: registerForApp,
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <div className="w-50 h-50 mx-auto">
      <div className="card">
        <div className="card-title text-center mt-4 mb-4">
          <h3>Registration</h3>
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
          <div>Test</div>
          <div>{register.isError && JSON.stringify(register.error)}</div>
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
          <button
            className="col-sm-4 btn btn-primary"
            onClick={(event) => {
              event.preventDefault();
              register.mutate;
            }}>
            Sign up
          </button>
          <div className="col-sm-4" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
