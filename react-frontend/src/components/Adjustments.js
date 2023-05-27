import React, { useState, useEffect } from "react";
import "./Adjustments.css";

import axios from "axios";

export default function Adjustments() {
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [reservations, setReservations] = useState([]);
  const [course, setCourse] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  const days = [
    { value: 1, text: "Poniedziałek" },
    { value: 2, text: "Wtorek" },
    { value: 3, text: "Środa" },
    { value: 4, text: "Czwartek" },
    { value: 5, text: "Piątek" },
  ];






  const startingTimeSlots = [
    "08:15:00",
    "09:15:00",
    "10:15:00",
    "11:15:00",
    "12:15:00",
    "13:15:00",
    "14:15:00",
    "15:15:00",
    "16:15:00",
    "17:15:00",
    "18:15:00",
    "19:15:00",
  ];

  const endingTimeSlots = [
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
    "20:00:00",
  ];

  useEffect(() => {
    loadRooms();
  }, []);


  const displayMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    displayMessage("To jest przykładowa wiadomość");
  }, []);









  const loadRooms = async () => {
    const result = await axios.get("http://localhost:8080/rooms");
    setRoomList(result.data);
  };

  const handleSelectedRoom = (e) => {
    setSelectedRoom(e.target.value);
  };

  function generateTableHeader() {
    return (
      <thead>
        <tr>
          <th style={{ color: "white" }}>Lp.</th>
          {startingTimeSlots.map((timeSlot, index) => (
            <th
              key={index}
              style={{
                color: "white",
                whiteSpace: "nowrap",
                width: "8%",
                textAlign: "center",
              }}
            >
              {timeSlot.slice(0, 5)} - {endingTimeSlots[index].slice(0, 5)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  const displayCourseType = (courseType) => {
    switch (courseType) {
      case 0:
        return "L, ";
      case 1:
        return "W, ";
      default:
        return "";
    }
  };

  useEffect(() => {
    console.log(reservations);
  }, [reservations]);

  function generateSingleReservationCard(reservation) {
    return (
      <td>
        <div className="card-container">
          <div className="card text-black bg-striped">
            <h5 className="card-header">
              {reservation
                ? displayCourseType(reservation.course.course_type) +
                  reservation.start_week +
                  "-" +
                  reservation.end_week
                : ""}
            </h5>
            <div className="card-body">
              <p className="card-text course-text">
                {reservation ? reservation.course.name : ""}
              </p>
              <p className="card-text room-text">
                {reservation ? reservation.room.name : ""}
              </p>
              <p className="card-text">
                {reservation
                  ? reservation.user.first_name +
                    " " +
                    reservation.user.last_name
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <button className="btn btn-primary">Dodaj</button>
      </td>
    );
  }

  const fetchReservations = async () => {
    try {
      console.log(selectedRoom);
      const response = await fetch(
        `http://localhost:8080/class_schedules/room/name/${selectedRoom}`
      );
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        console.log("Failed to fetch reservations");
      }
    } catch (error) {
      console.log("Error:", error);
    }
    console.log(reservations);
  };

  useEffect(() => {
    fetchReservations();
  }, [selectedRoom]);

  function parseTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    return new Date(0, 0, 0, hours, minutes, seconds);
  }

  function compareTime(time1, time2) {
    return time1.getTime() - time2.getTime();
  }

  function generateTableContent() {
    return (
      <tbody>
        {days.map((day) => (
          <tr key={day.value}>
            <td style={{ color: "white", textAlign: "center", verticalAlign: "middle" }}>{day.text}</td>
            {Array.from({ length: 12 }, (_, index) => {
              const startTime = parseTime(startingTimeSlots[index]);
              const endTime = parseTime(endingTimeSlots[index]);

              const reservation = reservations.find(
                (reservation) =>
                  day.value === reservation.day_of_week &&
                  compareTime(startTime, parseTime(reservation.start_time)) >=
                    0 &&
                  compareTime(parseTime(reservation.end_time), endTime) >= 0
              );

              if (reservation) {
                console.log(reservation);
                return generateSingleReservationCard(reservation);
              } else {
                return generateSingleReservationCard();
              }
            })}
          </tr>
        ))}
      </tbody>
    );
  }

  function generateTable() {
    const room = roomList.find((option) => option.name === selectedRoom);
    const roomText = room ? room.name : "";
    return (
      <div className="card justfiy-content-center align-items-center text-white bg-dark mb-3">
        <div className="card-title">{roomText}</div>
        <div className="card-body">
          <div className="table table-responsive table-striped">
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
          <div className="col-2 mb-3 mx-2 d-flex flex-column p-3">
            <label className="text-center" htmlFor="room">
              Wybór sali
            </label>
            <select
              className="form-select d-block w-100 mt-1"
              value={selectedRoom}
              onChange={handleSelectedRoom}
            >
              <option value="no-room-selected">
                Wybierz jedną z opcji...
              </option>
              {roomList.map((room) => (
                <option key={room.value} value={room.value}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2 mb-3 mx-2 d-flex flex-column p-3">
            <button className="btn btn-primary mb-2" onClick={() => {}}>
              Zapisz
            </button>
            <button className="btn btn-primary" onClick={() => {}}>
              Generowanie
            </button>
          </div>
        </div>
      </div>
  {/* KOMPONENT LOGGERA */}
  <div className="logger">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      {/* TUTAJ GENEROWANA TABELKA */}
      {generateTable()}

    
    </div>
    
  );
}