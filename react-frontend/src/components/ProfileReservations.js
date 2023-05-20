import React, { useEffect, useState } from "react";
import "./ProfileInfo.css";
import { useNavigate } from "react-router-dom";

function ProfileReservations() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [reservationsList, setReservationsList] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
    }
    setUserData(storedUser);
    userData && setReservationsList(userData.reservations);
  }, []);

  const renderUserReservations = () => {
    return (
      <div className="room-wrapper">
        <h2 className="room-title">Lista Rezerwacji</h2>
        <div className="horizontal-line"></div>
        <table className="room-table">
          <thead>
            <tr>
              <th>Lp.</th>
              <th>Status</th>
              <th>Kurs</th>
              <th>Pokój</th>
              <th>Dzień tygodnia</th>
              <th>Początek - dzień</th>
              <th>Koniec - dzień</th>
              <th>Początek - tydzień</th>
              <th>Koniec - tydzień</th>
              <th>Parzystość</th>
            </tr>
          </thead>
          <tbody>
            {reservationsList.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{index + 1}.</td>
                <td>{reservation.status}</td>
                <td>{reservation.class_schedule_id.course_id.name}</td>
                <td>{reservation.class_schedule_id.room_id.name}</td>
                <td>{reservation.class_schedule_id.day_of_week}</td>
                <td>{reservation.class_schedule_id.start_time}</td>
                <td>{reservation.class_schedule_id.end_time}</td>
                <td>{reservation.class_schedule_id.start_week}</td>
                <td>{reservation.class_schedule_id.end_week}</td>
                <td>{reservation.class_schedule_id.is_parity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return renderUserReservations();
}

export default ProfileReservations;
