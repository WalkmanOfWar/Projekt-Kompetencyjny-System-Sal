import React, { useEffect } from "react";
import { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    }
    setUserData(storedUser);
  }, []);

  const renderLogin = () => {
    return (
      <Link to={"/login"} className="nav-link px-3">
        Zaloguj się
      </Link>
    );
  };

  const renderAccount = () => {
    return (
      <Link to={"/profile"} className="nav-link px-3">
        Mój profil
      </Link>
    );
  };

  const renderUserAccount = () => {
    return (
      <li className="nav-item nav-item-text">
        {userData ? renderAccount() : renderLogin()}
      </li>
    );
  };

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
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse align-items-center"
          id="navbarXl">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item nav-item-text">
              <Link to={"/"} className="nav-link px-3">
                Strona główna
              </Link>
            </li>
            {renderUserAccount()}
          </ul>
        </div>
      </div>
    </nav>
  );
}
