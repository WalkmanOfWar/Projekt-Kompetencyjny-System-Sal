import React, { useState, useEffect } from "react";
import "./MainContent.css";
import axios from "axios";

export default function MainContent() {
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [reservations, setReservations] = useState("");
  const [course, setCourse] = useState("");
  const [room, setRoom] = useState("");
  const [selectedScheduleType, setSelectedScheduleType] = useState("");
  const [displaySchedule, setDisplaySchedule] = useState(false);

  const scheduleTypeOptions = [
    { value: "no-plan", text: "Wybierz jedną z opcji..." },
    { value: "student-plan", text: "Plan dla studentów" },
    { value: "teacher-plan", text: "Plan dla wykładowców" },
  ];

  const days = [
    { value: "monday", text: "Poniedziałek" },
    { value: "tuesday", text: "Wtorek" },
    { value: "wednesday", text: "Środa" },
    { value: "thursday", text: "Czwartek" },
    { value: "friday", text: "Piątek" },
  ];

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const result = await axios.get("http://localhost:8080/rooms");
    setRoomList(result.data);
  };

  const handleSelectedRoom = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleSelectedScheduleType = (e) => {
    setSelectedScheduleType(e.target.value);
  };

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

  // Załadować dane z class_schedules - porównanie room_id
  // Losowe dane dla Sala 5

  const loadReservations = async () => {
    try {
      const result = await axios.get("http://localhost:8080/class_schedules");
      // console.log(result.data)
      setReservations(result.data);
    } catch (error) {
      console.error("Error in loading reservations: ", error);
    }
  };

  function generateSingleReservationCard(reservation) {
    return (
      <td>
        <div className="card text-white bg-dark">
          <h5 className="card-header">
            {reservation
              ? "w, " + reservation.start_week + "-" + reservation.end_week
              : ""}
          </h5>
          <div className="card-body">
            <p className="card-text course-text">
              {reservation ? reservation.course.name : ""}
            </p>
            <p className="card-text room-text">
              {reservation ? reservation.room.name : ""}
            </p>
            <p className="card-text">{reservation ? "Piotr Pabich" : ""}</p>
          </div>
        </div>
      </td>
    );
  }

  function generateTableContent() {
    if (selectedRoom) {
      loadReservations();
    }

    return (
      <tbody>
        {days.map((day) => (
          <tr key={day.id}>
            <td>{day.text}</td>
            {Array.from({ length: 12 }, (_, index) => {
              if (reservations && reservations[0].start_time >= "12:15:00") {
                return generateSingleReservationCard(reservations[0]);
              }
              return generateSingleReservationCard("");
            })}
          </tr>
        ))}
      </tbody>
    );
  }

  function generateTable() {
    const scheduleType = scheduleTypeOptions.find(
      (option) => option.value === selectedScheduleType
    );
    const scheduleTypeText =
      scheduleType && scheduleType.value != "no-plan" ? scheduleType.text : "";
    const room = roomList.find((option) => option.name === selectedRoom);
    const roomText = room ? room.name : "";
    return (
      <div className="card justfiy-content-center align-items-center text-white bg-dark mb-3">
        <div class="card-header">{scheduleTypeText}</div>
        <div class="card-title">{roomText}</div>
        {/* <div class="card-title">Grupa dziekańska 6I TI-3</div> */}
        <div className="card-body">
          <div className="table table-responsive table-dark">
            {generateTableHeader()}
            {generateTableContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid background">
      <div className="row">
        <div className="d-inline-flex justify-content-center">
          <div className=" col-2 mb-3 mx-2 d-flex flex-column p-3">
            <label className="text-start ms-1" for="occupation">
              Wybór planu
            </label>
            <select
              className="form-select d-block w-100 mt-1"
              value={selectedScheduleType}
              onChange={handleSelectedScheduleType}>
              {scheduleTypeOptions.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
          </div>
          <div className=" col-2 mb-3 mx-2 d-flex flex-column p-3">
            <label className="text-center" for="room">
              Wybór sali
            </label>
            <select
              className="form-select d-block w-100 mt-1"
              value={selectedRoom}
              onChange={handleSelectedRoom}>
              <option value="no-room-selected">Wybierz jedną z opcji...</option>
              {roomList.map((room) => (
                <option value={room.value}>{room.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* <img
        className="img-fluid mb-5 w-75"
        // src={options[selected].img}
        src="images\schedule-mockup.png"
        alt="main-content"
      /> */}

      {/* TUTAJ GENEROWANA TABELKA */}
      {generateTable()}
    </div>
  );
}
