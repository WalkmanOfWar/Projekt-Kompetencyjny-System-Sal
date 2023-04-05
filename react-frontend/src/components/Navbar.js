import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container-fluid">
        <Link to={"/"} className="nav-link px-3">
          <img className="nav-logo me-4" src="images\logo.png" alt="logo" />
          <div className="nav-item-text">Time Tacticians</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarXl"
          aria-controls="navbarXl"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse align-items-center"
          id="navbarXl"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item nav-item-text">
              <Link to={"/faq"} className="nav-link px-3">
                FAQ
              </Link>
            </li>
            <li className="nav-item nav-item-text">
              <Link to={"/about"} className="nav-link px-3">
                O nas
              </Link>
            </li>
            <li className="nav-item nav-item-text">
              <Link to={"/contact"} className="nav-link px-3">
                Kontakt
              </Link>
            </li>
            <li className="nav-item nav-item-text">
              <Link to={"/login"} className="nav-link px-3">
                Zaloguj się
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
