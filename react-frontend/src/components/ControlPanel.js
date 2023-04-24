import React, { useState } from "react";
import "./ControlPanel.css";
 
import Room from "./Room";

function ControlPanel() {
  const [selectedButton, setSelectedButton] = useState("Room");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderComponent = () => {
    switch (selectedButton) {
      case "Room":
        return <Room />;
     
      default:
        return <Room />;
    }
  };

  return (
    <div className="info-wrapper">
      <span className="panel-text">Panel sterowania</span>
      <div className="button-group">
      <button className="panel-button"     onClick={() => handleButtonClick("Room")}  > Sale</button>
        <button className="panel-button">Prowadzący</button>
        <button className="panel-button">Przedmioty</button>
        <button className="panel-button">Plan zajęć</button>
        <button className="panel-button">Udogodnienia</button>
        <button className="panel-button">Typy sal</button>


      </div>
      <div className="button-group">
        <button className="panel-button">Przedmioty prowadzących</button>
        <button className="panel-button">Rezerwacje</button>
        <button className="panel-button">Korekty</button>
        <button className="panel-button">Generowanie</button>

      </div>
      {renderComponent()}

    </div>
  );
}

export default ControlPanel;
