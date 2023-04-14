import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container-fluid footer-background">
      <footer className="py-1">
        <ul className="nav justify-content-center border-bottom py-3 mb-3">
          <li className="nav-item">
            <Link to={"/"} className="nav-link px-3">
              <p className="text-white">Strona główna</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/faq"} className="nav-link px-3">
              <p className="text-white">FAQ</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/about"} className="nav-link px-3">
              <p className="text-white">O nas</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/profile"} className="nav-link px-3">
              <p className="text-white">Profil</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/contact"} className="nav-link px-3">
              <p className="text-white">Kontakt</p>
            </Link>
          </li>
        </ul>
        <div className="text-center text-white">
          <p>Made by:</p>
          <p>Piotr Pabich</p>
          <p>Maciej Sierzputowski</p>
          <p>Szymon Owczarek</p>
          <p>Wiktor Koprowski</p>
          <p>@2023 Time Tacticians</p>
        </div>
      </footer>
    </div>
  );
}
