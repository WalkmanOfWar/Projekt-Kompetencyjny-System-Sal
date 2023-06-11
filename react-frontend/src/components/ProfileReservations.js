import React, { useEffect, useState } from 'react';
import './ProfileInfo.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfileReservations() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [reservationsList, setReservationsList] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      navigate('/login');
    }
    setUserData(storedUser);
  }, []);

  useEffect(() => {
    console.log(userData);
    userData && loadReservations();
  }, [userData]);

  const loadReservations = async () => {
    const result = await axios.get(
      `http://localhost:8080/reservations/${userData.email}`
    );
    console.log('Here');
    setReservationsList(result.data);
  };

  const displayStatus = (status) => {
    switch (status) {
      case 0:
        return 'Niezaakceptowana';
      case 1:
        return 'Zaakceptowana';
      default:
        break;
    }
  };

  const displayParity = (parity) => {
    switch (parity) {
      case '1':
        return 'Tak';
      case '0':
        return 'Nie';
      default:
        return '-';
    }
  };

  const displayDayOfWeeks = (day) => {
    switch (day) {
      case 1:
        return 'Poniedziałek';
      case 2:
        return 'Wtorek';
      case 3:
        return 'Środa';
      case 4:
        return 'Czwartek';
      case 5:
        return 'Piątek';
      default:
        return '-';
    }
  };

  const renderUserReservations = () => {
    return (
      <div className='room-wrapper'>
        <h2 className='room-title'>Lista Rezerwacji</h2>
        <div className='horizontal-line'></div>
        <table className='room-table'>
          <thead>
            <tr>
              <th>Lp.</th>
              <th>Użytkownik</th>
              <th>Kurs</th>
              <th>Pokój</th>
              <th>Dzień tygodnia</th>
              <th>Początek - dzień</th>
              <th>Koniec - dzień</th>
              <th>Początek - tydzień</th>
              <th>Koniec - tydzień</th>
              <th>Parzystość</th>
              <th>Status</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {reservationsList.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{index + 1}.</td>
                <td>{reservation.user.email}</td>
                <td>{reservation.classSchedule.course.name}</td>
                <td>{reservation.classSchedule.room.name}</td>
                <td>
                  {displayDayOfWeeks(reservation.classSchedule.day_of_week)}
                </td>
                <td>{reservation.classSchedule.start_time}</td>
                <td>{reservation.classSchedule.end_time}</td>
                <td>{reservation.classSchedule.start_week}</td>
                <td>{reservation.classSchedule.end_week}</td>
                <td>{displayParity(reservation.classSchedule.is_parity)}</td>
                <td>{displayStatus(reservation.status)}</td>
                <td>
                  <button className='btn btn-danger mx-2'>Delete</button>
                </td>
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
