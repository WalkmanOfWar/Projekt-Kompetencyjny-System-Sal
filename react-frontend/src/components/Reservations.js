import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';

function Reservations() {
  const [reservationList, setReservationList] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

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

  //todo: dorobić to w backendzie
  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/reservations/${reservationId}`,
        {
          status: newStatus,
        }
      );
      if (response.status === 200) {
        const updatedReservations = reservationList.map((reservation) => {
          if (reservation.id === reservationId) {
            return { ...reservation, status: newStatus };
          }
          return reservation;
        });
        setReservationList(updatedReservations);
        console.log('Reservation status updated successfully.');
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const displayStatus = (status) => {
    switch (status) {
      case 0:
        return 'Oczekująca';
      case 1:
        return 'Zaakceptowana';
      case 2:
        return 'Odrzucona';
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
        return 'x2';
      case false:
        return 'x1';
      default:
        return '-';
    }
  };

  const handleAcceptReservation = (reservationId) => {
    updateReservationStatus(reservationId, 1);
  };

  const handleRejectReservation = (reservationId) => {
    updateReservationStatus(reservationId, 2);
  };

  const generateReservationsDisplay = () => {
    let sortedReservations = [...reservationList];

    if (sortBy === 'user') {
      sortedReservations = sortedReservations.sort((a, b) =>
        a.user.email.localeCompare(b.user.email)
      );
    } else if (sortBy === 'room') {
      sortedReservations = sortedReservations.sort((a, b) =>
        a.classSchedule.room.name.localeCompare(b.classSchedule.room.name)
      );
    } else if (sortBy === 'course') {
      sortedReservations = sortedReservations.sort((a, b) =>
        a.classSchedule.course.name.localeCompare(b.classSchedule.course.name)
      );
    } else if (sortBy === 'parity') {
      sortedReservations = sortedReservations.sort((a, b) => {
        return a.classSchedule.is_parity - b.classSchedule.is_parity;
      });
    } else if (sortBy === 'day') {
      sortedReservations = sortedReservations.sort((a, b) => {
        return a.day_of_week - b.day_of_week;
      });
    } else if (sortBy === 'startTime') {
      sortedReservations = sortedReservations.sort((a, b) =>
        a.classSchedule.start_time.localeCompare(b.classSchedule.start_time)
      );
    } else if (sortBy === 'endTime') {
      sortedReservations = sortedReservations.sort((a, b) =>
        a.classSchedule.end_time.localeCompare(b.classSchedule.end_time)
      );
    } else if (sortBy === 'startWeek') {
      sortedReservations = sortedReservations.sort((a, b) => {
        return a.classSchedule.start_week - b.classSchedule.start_week;
      });
    } else if (sortBy === 'endWeek') {
      sortedReservations = sortedReservations.sort((a, b) => {
        return a.classSchedule.end_week - b.classSchedule.end_week;
      });
    } else if (sortBy === 'status') {
      sortedReservations = sortedReservations.sort((a, b) => {
        return a.status - b.status;
      });
    }
    return (
      <>
        <h2 className='room-title'>Lista Rezerwacji</h2>
        <div className='horizontal-line'></div>
        <div className='sort-container'>
          <h4 htmlFor='sort' className='label text-light'>
            Sortuj według:
          </h4>
          <select
            className='form-select'
            id='sort'
            value={sortBy}
            onChange={handleSortBy}>
            <option value=''>Brak sortowania</option>
            <option value='user'>Prowadzący</option>
            <option value='room'>Nazwa sali</option>
            <option value='course'>Nazwa kursu</option>
            <option value='parity'>Parzystość</option>
            <option value='day'>Dzień</option>
            <option value='startTime'>Czas - początek</option>
            <option value='endTime'>Czas - koniec</option>
            <option value='startWeek'>Tydzień - początek</option>
            <option value='endWeek'>Tydzień - koniec</option>
            <option value='status'>Status rezerwacji</option>
          </select>
        </div>
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
            {sortedReservations.map((reservation, index) => (
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
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleAcceptReservation(reservation.id)}>
                    Akceptuj
                  </button>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => handleRejectReservation(reservation.id)}>
                    Odrzuć
                  </button>
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
