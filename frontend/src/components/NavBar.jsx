import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";

const NavBar = () => {
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
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/homepage">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gamepage">
                Game
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
