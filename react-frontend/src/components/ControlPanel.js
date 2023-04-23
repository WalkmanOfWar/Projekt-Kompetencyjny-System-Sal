import React from "react";
import "./ControlPanel.css";

function ControlPanel() {
  return (
    <div className="info-wrapper">
      <span className="panel-text">Panel sterowania</span>
      <div className="button-group">
        <button className="panel-button">Sale</button>
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
    </div>
  );
}

export default ControlPanel;
