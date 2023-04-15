import React from "react";
import "./SignIn.css";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="wrapper py-3">
      <div className="mycontainer shadow">
        <img className="nav-logo my-3" src="images/logo.png" alt="logo" />
        <div className="nav-item-text text-white">Time Tacticians</div>
        <div className="input-container form-floating text-white mx-5 mt-3">
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            className="form-control bg-transparent text-white"
            id="floatingUsername"
          />
          <label for="floatingUsername">Nazwa użytkownika</label>
        </div>

        <div className="input-container form-floating text-white mx-5">
          <input
            type="text"
            placeholder="Hasło"
            className="form-control bg-transparent text-white"
            id="floatingPassword"
          />
          <label for="floatingPassword">Hasło</label>
        </div>
        <div className="input-container form-floating text-white mx-5">
          <input
            type="text"
            placeholder="Potwórz hasło"
            className="form-control bg-transparent text-white"
            id="floatingPassword"
          />
          <label for="floatingPassword">Potwórz hasło</label>
        </div>

        <button
          type="submit"
          className="input-container mx-5 mb-3 btn btn-secondary btn-lg bg-dark opacity-75"
        >
          Zarejestruj się
        </button>
        <p className="text-white register-text">Lub Zaloguj się Używając</p>
        <a href="#">
          <FaGoogle className="icon-register" />
        </a>
        <a href="#">
          <FaFacebook className="icon-register" />
        </a>
        <a href="#">
          <FaTwitter className="icon-register" />
        </a>
        <br />
        <p className="text-white">
          Masz już konto?
          <Link
            to={"/login"}
            className="link-primary text-info register-text mb-3 new-link-space"
          >
            Zaloguj się
          </Link>
        </p>
        <br />
      </div>
    </div>
  );
}

export default SignUp;
