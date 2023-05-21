import React, { useState, useEffect } from 'react';
import './GenerateHomeTable.css';
import axios from 'axios';

export default function GenerateHomeTable() {
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [reservations, setReservations] = useState([]);
  const [course, setCourse] = useState('');
  const [room, setRoom] = useState('');
  const [selectedScheduleType, setSelectedScheduleType] = useState('');
  const [displaySchedule, setDisplaySchedule] = useState(false);

  const scheduleTypeOptions = [
    { value: 'no-plan', text: 'Wybierz jedną z opcji...' },
    { value: 'student-plan', text: 'Plan dla studentów' },
    { value: 'teacher-plan', text: 'Plan dla wykładowców' },
  ];

  const days = [
    { value: 'monday', text: 'Poniedziałek' },
    { value: 'tuesday', text: 'Wtorek' },
    { value: 'wednesday', text: 'Środa' },
    { value: 'thursday', text: 'Czwartek' },
    { value: 'friday', text: 'Piątek' },
  ];

  const startingTimeSlots = [
    '08:15:00',
    '09:15:00',
    '10:15:00',
    '11:15:00',
    '12:15:00',
    '13:15:00',
    '14:15:00',
    '15:15:00',
    '16:15:00',
    '17:15:00',
    '18:15:00',
    '19:15:00',
  ];

  const endingTimeSlots = [
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
    '20:00:00',
  ];

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const result = await axios.get('http://localhost:8080/rooms');
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

  // const loadReservations = async (selectedRoom) => {
  //   try {
  //     console.log(selectedRoom);
  //     const result = await axios.get(
  //       'http://localhost:8080/class_schedules/room/name/',
  //       selectedRoom
  //     );
  //     // console.log(result.data)
  //     setReservations(result.data);
  //     // console.log(result.data);
  //   } catch (error) {
  //     console.error('Error in loading reservations: ', error);
  //   }
  // };

  function generateSingleReservationCard(reservation) {
    return (
      <td>
        <div className='card text-white bg-dark'>
          <h5 className='card-header'>
            {reservation
              ? 'w, ' + reservation.start_week + '-' + reservation.end_week
              : ''}
          </h5>
          <div className='card-body'>
            <p className='card-text course-text'>
              {reservation ? reservation.course.name : ''}
            </p>
            <p className='card-text room-text'>
              {reservation ? reservation.room.name : ''}
            </p>
            <p className='card-text'>{reservation ? 'Piotr Pabich' : ''}</p>
          </div>
        </div>
      </td>
    );
  }

  function renderSingleRecord(reservation) {
    const start_time = reservation.start_time;
    const end_time = reservation.end_time;
    const row = reservation.day_of_week;
    const index_start_col = startingTimeSlots.indexOf(start_time);
    const index_end_col = endingTimeSlots.indexOf(end_time);

    const renderedRecords = [];
    for (let i = index_start_col; i <= index_end_col; i++) {
      console.log('I: ' + i);
      renderedRecords.push(
        <tr key={`${row}-${i}`}>
          <td key={`${row}-${i}`}>
            {generateSingleReservationCard(reservation)}
          </td>
        </tr>
      );
    }

    return renderedRecords;
  }

  useEffect(() => {
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
          console.log('Failed to fetch reservations');
        }
      } catch (error) {
        console.log('Error:', error);
      }
      console.log(reservations);
    };

    fetchReservations();
  }, [selectedRoom]);

  function generateTableContent() {
    return (
      <tbody>
        {days.map((day) => (
          <tr key={day.id}>
            <td>{day.text}</td>
            {reservations.map((reservation) => renderSingleRecord(reservation))}
            {/* const startTime = startingTimeSlots[index];
              const endTime = endingTimeSlots[index];
              if (reservations && reservations.start_time >= startTime
                && reservations) {
                return generateSingleReservationCard(reservations[0]);
              } */}
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
      scheduleType && scheduleType.value !== 'no-plan' ? scheduleType.text : '';
    const room = roomList.find((option) => option.name === selectedRoom);
    const roomText = room ? room.name : '';
    return (
      <div className='card justfiy-content-center align-items-center text-white bg-dark mb-3'>
        <div class='card-header'>{scheduleTypeText}</div>
        <div class='card-title'>{roomText}</div>
        {/* <div class="card-title">Grupa dziekańska 6I TI-3</div> */}
        <div className='card-body'>
          <div className='table table-responsive table-dark'>
            {generateTableHeader()}
            {generateTableContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid background'>
      <div className='row'>
        <div className='d-inline-flex justify-content-center'>
          <div className=' col-2 mb-3 mx-2 d-flex flex-column p-3'>
            <label className='text-start ms-1' for='occupation'>
              Wybór planu
            </label>
            <select
              className='form-select d-block w-100 mt-1'
              value={selectedScheduleType}
              onChange={handleSelectedScheduleType}>
              {scheduleTypeOptions.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
          </div>
          <div className=' col-2 mb-3 mx-2 d-flex flex-column p-3'>
            <label className='text-center' for='room'>
              Wybór sali
            </label>
            <select
              className='form-select d-block w-100 mt-1'
              value={selectedRoom}
              onChange={handleSelectedRoom}>
              <option value='no-room-selected'>Wybierz jedną z opcji...</option>
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
