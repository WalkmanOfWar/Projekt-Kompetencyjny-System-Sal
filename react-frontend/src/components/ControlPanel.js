import React, { useState } from "react";
import "./ControlPanel.css";
import Room from "./Room";
import Room_types from "./Room_types";
import User_courses from "./User_courses";
import Courses from "./Courses";
import Users from "./Users";
import Facilities from "./Facilities";
import Reservations from "./Reservations";
import Class_schedule from "./Class_schedule";


function ControlPanel() {
  const [selectedButton, setSelectedButton] = useState("Room");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderComponent = () => {
    switch (selectedButton) {
      case "Room":
        return <Room />;
      case "Room_types":
        return <Room_types />;
      case "User_courses":
        return <User_courses />;
      case "Courses":
         return <Courses />;
      case "Users":
         return <Users />;
      case "Facilities":
         return <Facilities />;
      case "Reservations":
         return <Reservations />;
      case "Class_schedule":
          return <Class_schedule />;
      default:
        return <Room />;
    }
  };

  return (
    <div className="info-wrapper">
      <span className="panel-text">Panel sterowania</span>
      <div className="button-group">
        <button className={`btn btn-primary ${selectedButton === "Room" ? "selected" : ""}`} onClick={() => handleButtonClick("Room")}>Sale</button>
        <button className={`btn btn-primary ${selectedButton === "Users" ? "selected" : ""}`} onClick={() => handleButtonClick("Users")}>Użytkownicy</button>
        <button className={`btn btn-primary ${selectedButton === "Courses" ? "selected" : ""}`} onClick={() => handleButtonClick("Courses")}>Przedmioty</button>
        <button className={`btn btn-primary ${selectedButton === "Class_schedule" ? "selected" : ""}`} onClick={() => handleButtonClick("Class_schedule")}>Plan zajęć</button>
        <button className={`btn btn-primary ${selectedButton === "Facilities" ? "selected" : ""}`} onClick={() => handleButtonClick("Facilities")}>Dostępne udogodnienia</button>
        {/* DODAĆ Udogodnienia przedmiotów */}
        {/* DODAĆ Udogodnienia sal */}
        <button className={`btn btn-primary ${selectedButton === "Room_types" ? "selected" : ""}`} onClick={() => handleButtonClick("Room_types")}>Typy sal</button>
      </div>
      <div className="button-group">
        <button className={`btn btn-primary ${selectedButton === "User_courses" ? "selected" : ""}`} onClick={() => handleButtonClick("User_courses")}>Przedmioty prowadzących</button>
        <button className={`btn btn-primary ${selectedButton === "Reservations" ? "selected" : ""}`} onClick={() => handleButtonClick("Reservations")}>Rezerwacje</button>
        <button className={`btn btn-primary ${selectedButton === "Korekty" ? "selected" : ""}`} onClick={() => handleButtonClick("Korekty")}>Korekty</button>
        <button className={`btn btn-primary ${selectedButton === "Generowanie" ? "selected" : ""}`} onClick={() => handleButtonClick("Generowanie")}>Generowanie</button>
      </div>
      {renderComponent()}
    </div>
  );
}

export default ControlPanel;
