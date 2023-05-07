import React from "react";
import "./SignIn.css";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { Link, Route } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import axios from 'axios';
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";


function SignIn() {

  const {register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = data =>{
    axios.post('http://localhost:8080/login', data)
      .then(response => {
        // Udało się zalogować, można wykonać jakieś dodatkowe akcje.
        navigate('/profile');
      })
      .catch(error => {
        // Wystąpił błąd logowania, można wyświetlić odpowiedni komunikat.
        console.log("Nie udało się zalogować")
      });
  };


  return (
    <div className="wrapper py-3">
      <div className="mycontainer shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <img className="nav-logo my-3" src="images/logo.png" alt="logo" />
          <div className="nav-item-text text-white">Time Tacticians</div>
          <div className="input-container form-floating text-white mx-5 mt-3">
            <input
              type="email"
              placeholder="Adres e-mail"
              className="form-control bg-transparent text-white"
              id="floatingEmail"
              {...register("email", { required: true })}
            />
            <label for="floatingEmail">Adres e-mail</label>
          </div>

          <div className="input-container form-floating text-white mx-5">
            <input
              type="password"
              placeholder="Hasło"
              className="form-control bg-transparent text-white"
              id="floatingPassword"
              {...register("password", { required: true })}
            />
            <label for="floatingPassword">Hasło</label>
          </div>


          <button
            type={"submit"}
            className="input-container mx-5 mb-3 btn btn-secondary btn-lg bg-dark opacity-75"
          >
            Zaloguj się
          </button>
        </form>
        <p className="text-white">Lub jeżeli nie posiadasz konta</p>
        <div>
          <Link
            to={"/register"}
            className="link-primary text-info register-text mb-3"
          >
            Zarejestruj się
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
}

export default SignIn;
