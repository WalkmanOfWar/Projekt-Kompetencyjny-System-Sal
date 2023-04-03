import React from "react";
import "./MainContent.css";

export default function MainContent() {
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
            <select
              className="form-select d-block w-100 mt-1"
              id="state"
              required=""
            >
              <option value="">Wybierz jedną z opcji...</option>
              <option>Sala A</option>
              <option>Sala B</option>
              <option>Sala C</option>
              <option>Sala D</option>
            </select>
          </div>
        </div>
      </div>
      <img
        className="img-fluid schedule_img mb-5 w-75"
        src="images\schedule-mockup.png"
        alt="main-content"
      />
    </div>
  );
}
