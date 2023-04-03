import React from "react"
import "./Navbar.css"

export default function Navbar() {
    return (
        //Narazie jest xl, potem można zmienić że składa się kiedy jest mniejszy ekran
        <nav className="navbar navbar-expand-xl">
            <div className="container-fluid">
                <a className="navbar-brand d-flex flex-row align-items-center" href="http://localhost:3000/">
                    <img className="nav-logo me-4" src="images\logo.png" alt="logo"/>
                    <div className="nav-item-text">Time Tacticians</div>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarXl" aria-controls="navbarXl" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse align-items-center" id="navbarXl">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item nav-item-text">
                            <a className="nav-link" href="http://localhost:3000/">Strona Główna</a>
                        </li>
                        <li className="nav-item nav-item-text">
                            <a className="nav-link" href="http://localhost:3000/">FAQ</a>
                        </li>
                        <li className="nav-item nav-item-text">
                            <a className="nav-link" href="http://localhost:3000/">O nas</a>
                        </li>
                        <li className="nav-item nav-item-text">
                            <a className="nav-link" href="http://localhost:3000/">Kontakt</a>
                        </li>
                        <li className="nav-item nav-item-text">
                            <a className="nav-link" href="http://localhost:3000/">Zaloguj się</a>
                        </li>
                    </ul>
                </div>
            </div>        
        </nav>
    )
}