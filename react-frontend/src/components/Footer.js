import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="container-fluid footer-background">
      <footer className="py-1">
        <ul className="nav justify-content-center border-bottom py-3 mb-3">
          <li className="nav-item">
            <a className="nav-link link-primary px-3 text-white" href="#">
              Strona główna
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-primary px-3 text-white" href="#">
              FAQ
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-primary px-3 text-white" href="#">
              O nas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link link-primary px-3 text-white" href="#">
              Kontakt
            </a>
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
