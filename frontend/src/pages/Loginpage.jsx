import React, { useState } from "react";
import { use } from "react";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

const Loginpage = (props) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();
  const fetchData = useFetch();

  const loginToApp = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER}/auth/login`, "POST", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.trim(),
        password: passwordInput.trim(),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      // to map all the errors (msg) from express-validator (array)
      if (Array.isArray(data.msg)) {
        const returnValue = data.msg.map((item, idx) => <p key={idx}>{item.msg}</p>);
        return { ok: false, msg: returnValue };
      } else {
        // to reflect any other errors (not array)
        return { ok: false, msg: data.msg };
      }
    }
  };

  const auth = useQuery({
    queryKey: ["qAuth"],
    queryFn: async () => {
      const res = await fetchData(`${import.meta.env.VITE_SERVER}/auth/login`, "POST", {
        username: usernameInput.trim(),
        password: passwordInput.trim(),
      });
      console.log(res);
      if (res.data) {
        const decoded = jwtDecode(res.data.access);
        res.data.username = decoded.username;
        return res.data;
      }
    },
    enabled: false,
  });

  const handleLogin = async () => {
    await auth.refetch();
    console.log(auth.isSuccess);
    console.log(auth.isError);
    console.log(auth.error);
    console.log(auth.data);
    setUsernameInput("");
    setPasswordInput("");
    props.setIsLogin(true);
    navigate("/user");
  };

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
        </div>

        <div className="card-body row">
          <div className="col-sm-4" />
          <button className="col-sm-4 btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <div className="col-sm-4" />
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
