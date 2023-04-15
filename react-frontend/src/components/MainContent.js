import React, { useState } from "react";
import "./MainContent.css";

export default function MainContent() {

  const options = [
    { value: "Sala 0", text: "...", img: ""},
    { value: "Sala A", text: "Sala A", img: "images/salaA"},
    { value: "Sala B", text: "Sala B", img: "images/salaB"},
    { value: "Sala C", text: "Sala C", img: "images/salaC"},
    { value: "Sala D", text: "Sala D", img: "images/salaD"}
  ];
  
  const [selected, setSelected] = useState(0);
  
  const mainHandleChange = (event) => {
    setSelected(event.target.value);
  };

  return (

    <div className="container-fluid background">
      <div className="row">
        <div className="d-inline-flex justify-content-center">
          {/* <div className=" col-2 mb-3 mx-2 d-flex flex-column p-3">
                        <label className="text-start ms-1" for="occupation">Wybór planu</label>
                        <select className="form-select d-block w-100 mt-1" id="country" required="">
                        <option value="">Wybierz jedną z opcji...</option>
                        <option>Plan dla studentów</option>
                        <option>Plan dla wykładowców</option>
                        </select>
                    </div> */}
          <div className=" col-2 mb-3 mx-2 d-flex flex-column p-3">
            <label className="text-center" for="room">
              Wybór sali
            </label>
            <select value={selected} onChange={mainHandleChange}
              className="form-select d-block w-100 mt-1"
              id="state"
              required="">
            {options.map((option, index) => (
                <option key={option.value} value={index}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <img
        className="img-fluid mb-5 w-75"
        // src={options[selected].img}
        src="images\schedule-mockup.png"
        alt="main-content"
      />
    </div>
  );
}
