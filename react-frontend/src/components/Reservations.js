import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';

function Reservations() {
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    console.log(reservationList);
  }, [reservationList]);

  const loadReservations = async () => {
    const result = await axios.get('http://localhost:8080/reservations');
    setReservationList(result.data);
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

  const displayDayOfWeek = (dayOfWeek) => {
    switch (dayOfWeek) {
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
        break;
    }
  };

  const displayParity = (parity) => {
    switch (parity) {
      case true:
        return 'Tak';
      case false:
        return 'Nie';
      default:
        return 'Nie brane pod uwagę';
    }
  };

  const generateReservationsDisplay = () => {
    return (
      <>
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
            {reservationList.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{index + 1}.</td>
                <td>{reservation.user.email}</td>
                <td>{reservation.classSchedule.course.name}</td>
                <td>{reservation.classSchedule.room.name}</td>
                <td>
                  {displayDayOfWeek(reservation.classSchedule.day_of_week)}
                </td>
                <td>{reservation.classSchedule.start_time}</td>
                <td>{reservation.classSchedule.end_time}</td>
                <td>{reservation.classSchedule.start_week}</td>
                <td>{reservation.classSchedule.end_week}</td>
                <td>{displayParity(reservation.classSchedule.is_parity)}</td>
                <td>{displayStatus(reservation.status)}</td>
                <td>
                  <button className='btn btn-primary mx-2'>Edit</button>
                  <button className='btn btn-danger mx-2'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return <div className='room-wrapper'>{generateReservationsDisplay()}</div>;
}

export default Reservations;
