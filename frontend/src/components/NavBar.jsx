import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { use, useRef } from "react";
import AuthCtx from "../context/authContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const authCtx = use(AuthCtx);
  const isAuthenticated = authCtx.accessToken.length > 0;
  const nameRef = useRef("");
  const navigate = useNavigate();

  const doSearch = (e) => {
    e.preventDefault();
    const query = nameRef.current.value;
    navigate(`/search/${query}`);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Gamemonger
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/homepage">
                All Games
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/gamepage">
                Game
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Search Games
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  User
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>{" "}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              ref={nameRef}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={doSearch}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
