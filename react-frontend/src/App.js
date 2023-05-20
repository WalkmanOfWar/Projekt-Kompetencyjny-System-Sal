import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Operator from "./pages/Operator";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/operator" element={<Operator />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
