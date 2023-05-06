import React, { useState, useEffect } from "react";
import "./MainContent.css";
import axios from "axios";

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

  const days = [
    {value: "monday", text: "Poniedziałek"},
    {value: "tuesday", text: "Wtorek"},
    {value: "wednesday", text: "Środa"},
    {value: "thursday", text: "Czwartek"},
    {value: "friday", text: "Piątek"}
  ]

  function generateTableHeader() {
    return (
        <thead>
          <tr>
              <th>Lp.</th>
              <th>08:15 - 09:00</th>
              <th>09:15 - 10:00</th>
              <th>10:15 - 11:00</th>
              <th>11:15 - 12:00</th>
              <th>12:15 - 13:00</th>
              <th>13:15 - 14:00</th>
              <th>14:15 - 15:00</th>
              <th>15:15 - 16:00</th>
              <th>16:15 - 17:00</th>
              <th>17:15 - 18:00</th>
              <th>18:15 - 19:00</th>
              <th>19:15 - 20:00</th>
            </tr>
        </thead>
    );
  }
  
  function generateSingleReservationCard() {
    return (
      <td>
        <div className="card text-white bg-dark">
            <h5 className="card-header">w, 1-15</h5>
            <div className="card-body">
              <p className="card-text course-text">Zaawansowane aplikacje internetowe</p>
              <p className="card-text room-text">Sala 20</p>
              <p className="card-text">Piotr Pabich</p>
            </div>
        </div>
      </td>
    );
  }

  function generateTableContent() {
    return (
      <tbody>
        {days.map((day) => (
          <tr key={day.id}>
            <td>{day.text}</td>
            {Array.from({ length: 12 }, (_) => (
            generateSingleReservationCard()
          ))}
          </tr>
        ))} 
      </tbody>
    );
  }

  function generateTable() {
    return (
      <div className="card text-white bg-dark mb-3" >
          <div class="card-header">Plan dla studentów</div>
          <div class="card-title">Grupa dziekańska 6I TI-3</div>
          <div className="card-body">
            <div className="table table-responsive table-dark">
              {generateTableHeader()}
              {generateTableContent()}
            </div>
          </div>
          
      </div>
    );
  }

  const scheduleTypeOptions = [
    {value: "no-plan", text: "Wybierz jedną z opcji..."},
    {value: "student-plan", text: "Plan dla studentów"},
    {value: "teacher-plan", text: "Plan dla wykładowców"}
  ]

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    loadRooms()
  }, []);

  const loadRooms = async () => {
    const result = await axios.get("http://localhost:8080/rooms");
    setRoomList(result.data)
  };


  return (

    <div className="container-fluid background">
      <div className="row">
        <div className="d-inline-flex justify-content-center">
          <div className=" col-2 mb-3 mx-2 d-flex flex-column p-3">
              <label className="text-start ms-1" for="occupation">Wybór planu</label>
              <select className="form-select d-block w-100 mt-1" id="schedule-type-id" required="">
              {scheduleTypeOptions.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
              </select>
          </div>
          <div className=" col-2 mb-3 mx-2 d-flex flex-column p-3">
            <label className="text-center" for="room">Wybór sali</label>
            <select className="form-select d-block w-100 mt-1" id="room-id" required="">
                <option value="no-room-selected">Wybierz jedną z opcji...</option>
            {roomList.map((room) => (
                <option value={room.value}>{room.name}</option>
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

      {/* TUTAJ GENEROWANA TABELKA */}
      {generateTable()}
    </div>
  );
}
