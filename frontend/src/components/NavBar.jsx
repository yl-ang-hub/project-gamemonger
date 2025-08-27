import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { use, useRef } from "react";
import AuthCtx from "../context/authContext";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

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
    <>
      <br />
      <nav
        className="navbar navbar-expand-lg navbar-custom"
        style={{ border: "2px solid #56b6c2", borderRadius: 10 }}
      >
        <div className="container-fluid ">
          <a className="navbar-brand" style={{ color: "#56b6c2" }} href="#">
            Gamemonger
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-customs"
            id="navbarNav"
          >
            <ul className="navbar-nav" style={{ color: "#56b6c2" }}>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ color: "#56b6c2" }}
                  to="/homepage"
                >
                  All Games
                </Link>
              </li>
              {/* <li className="nav-item">
              <Link className="nav-link" to="/gamepage">
                Game
              </Link>
            </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ color: "#56b6c2" }}
                  to="/search"
                >
                  Search Games
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#56b6c2" }}
                      to="/user"
                    >
                      User
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#56b6c2" }}
                      to="/cart"
                    >
                      Cart
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "#56b6c2" }}
                      to="/logout"
                    >
                      Logout
                    </Link>
                  </li>
                </>
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
                className={`form-control me-2 ${styles.searchInput}`}
                type="search"
                placeholder="Search"
                aria-label="Search"
                ref={nameRef}
                style={{ backgroundColor: "#56b6c2", color: "white" }}
              />
              <button
                className={`btn ${styles.searchButton}`}
                type="submit"
                onClick={doSearch}
                style={{ color: "#56b6c2" }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
