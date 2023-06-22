import React, { useState, useEffect } from 'react';
import './Adjustments.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'react-hook-form';

export default function Adjustments() {
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  let [selectedSchedule, setSelectedSchedule] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [course, setCourse] = useState('');
  const [room, setRoom] = useState('');
  const [classSchedules, setClassSchedules] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
  let [timeindex, setTimeIndex] = useState(null);
  let [day, setDay] = useState(null);
  let [countConflicts, setCountConflicts] = useState(0);
  const days = [
    { value: 1, text: 'Poniedziałek' },
    { value: 2, text: 'Wtorek' },
    { value: 3, text: 'Środa' },
    { value: 4, text: 'Czwartek' },
    { value: 5, text: 'Piątek' },
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

  const generateOptimizedClassSchedules = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8080/generate-classSchedules'
      );
      toast.success('Plan zajęć wygenerowany');
      console.log(response.data);
    } catch (error) {
      toast.error('Nie udało się wygenerować planu zajęć');
      console.log(error);
    }
  };

  const shuffleClassSchedules = async () => {
    try {
      const response = await axios.put(
        'http://localhost:8080/shuffle-classSchedules'
      );
      toast.success('Plan zajęć wygenerowany');
      console.log(response.data);
    } catch (error) {
      toast.error('Nie udało się wygenerować planu zajęć');
      console.log(error);
    }
  };

  const loadRooms = async () => {
    const result = await axios.get('http://localhost:8080/rooms');
    setRoomList(result.data);
  };

  const handleSelectedRoom = (e) => {
    setSelectedRoom(e.target.value);
  };
  const handleSelectedSchedule = (e) => {
    setSelectedSchedule(e.target.value);
  };

  const handleDeleteConfirmation = (reservation) => {
    setSelectedReservation(reservation);
    setShowConfirmation(true);
  };

  const handleAddButtonClick = (index, dayy) => {
    if (selectedRoom !== '') {
      setTimeIndex(index);
      setDay(dayy);
      setShowSelector(true);
    }
  };

  const handleCancelDelete = () => {
    setSelectedReservation(null);
    setShowConfirmation(false);
  };

  const handleCancelAdd = () => {
    setSelectedSchedule(null);
    setTimeIndex(null);
    setDay(null);
    setShowSelector(false);
  };

  const handleAddClassSchedule = async () => {
    if (selectedSchedule === null) {
      console.log('pusto');
    } else {
      const start = startingTimeSlots[timeindex];

      const roo = roomList.find((option) => option.name === selectedRoom);

      const sched = classSchedules.find(
        (schedule) => parseInt(schedule.id) === parseInt(selectedSchedule)
      );
      console.log(sched);

      const end = endingTimeSlots[timeindex + parseInt(sched.hours) - 1];
      const updatedSchedule = {
        id: sched.id,
        day_of_week: day,
        start_time: start,
        end_time: end,
        start_week: sched.start_week,
        end_week: sched.end_week,
        is_parity: sched.is_parity,
        hours: sched.hours,

        course: { id: sched.course.id },
        room: { id: roo.id },
        user: { id: sched.user.id },
        deanGroup: { id: sched.deanGroup.id },
      };

      try {
        console.log(updatedSchedule);
        await axios.put(
          `http://localhost:8080/class_schedules/${selectedSchedule}`,
          updatedSchedule
        );
      } catch (error) {
        console.log(error);
      }

      fetchReservations();
      fetchClassSchedules();
    }
    setTimeIndex(null);
    setDay(null);
    setSelectedSchedule(null);
    setShowSelector(false);
  };

  function generateTableHeader() {
    return (
      <thead>
        <tr>
          <th style={{ color: 'white' }}>Lp.</th>
          {startingTimeSlots.map((timeSlot, index) => (
            <th
              key={index}
              style={{
                color: 'white',
                whiteSpace: 'nowrap',
                width: '8%',
                textAlign: 'center',
              }}>
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
        return 'L, ';
      case 1:
        return 'W, ';
      default:
        return '';
    }
  };

  useEffect(() => {
    console.log(reservations);
  }, [reservations]);

  function generateSingleReservationCard(
    reservations,
    allRoomReservations,
    indexx,
    dayy
  ) {
    const handleCardClick = (reservation) => {
      handleDeleteConfirmation(reservation);
    };

    return (
      <td>
        {reservations.map((reservation) => {
          const hasConflict = hasConflicts(reservation, allRoomReservations);
          const cardClassName = hasConflict
            ? 'card text-black bg-danger'
            : 'card text-black bg-striped';
          return (
            <div
              key={reservation.id}
              className={cardClassName}
              onClick={() => handleCardClick(reservation)}>
              <h5 className='card-header'>
                {displayCourseType(reservation.course.course_type) +
                  reservation.start_week +
                  '-' +
                  reservation.end_week}
              </h5>
              <div className='card-body'>
                <p className='card-text course-text'>
                  {reservation.course.name}
                </p>
                <p className='card-text room-text'>{reservation.room.name}</p>
                <p className='card-text'>
                  {reservation.user.first_name +
                    ' ' +
                    reservation.user.last_name}
                </p>
              </div>
            </div>
          );
        })}
        <button
          className='btn btn-primary'
          onClick={() => handleAddButtonClick(indexx, dayy)}>
          {' '}
          Dodaj
        </button>{' '}
        {/* Przycisk jest dodany tutaj */}
      </td>
    );
  }

  function generateTableContent() {
    return (
      <tbody>
        {days.map((day) => (
          <tr key={day.value}>
            <td
              style={{
                color: 'white',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}>
              {day.text}
            </td>
            {Array.from({ length: 12 }, (_, index) => {
              const startTime = parseTime(startingTimeSlots[index]);
              const endTime = parseTime(endingTimeSlots[index]);
              const overlappingReservations = reservations.filter(
                (reservation) =>
                  day.value === reservation.day_of_week &&
                  compareTime(startTime, parseTime(reservation.start_time)) >=
                    0 &&
                  compareTime(parseTime(reservation.end_time), endTime) >= 0
              );
              if (overlappingReservations.length > 0) {
                return generateSingleReservationCard(
                  overlappingReservations,
                  classSchedules,
                  index,
                  day.value
                );
              } else {
                const reservation = reservations.find(
                  (reservation) =>
                    day.value === reservation.day_of_week &&
                    compareTime(startTime, parseTime(reservation.start_time)) >=
                      0 &&
                    compareTime(parseTime(reservation.end_time), endTime) === 0
                );
                if (reservation) {
                  return generateSingleReservationCard(
                    [reservation],
                    classSchedules,
                    index,
                    day.value
                  );
                } else {
                  return (
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={() => handleAddButtonClick(index, day.value)}>
                        {' '}
                        Dodaj
                      </button>
                    </td>
                  );
                }
              }
            })}
          </tr>
        ))}
      </tbody>
    );
  }

  const fetchClassSchedules = async () => {
    try {
      const response = await fetch(`http://localhost:8080/class_schedules`);
      if (response.ok) {
        const data = await response.json();
        setClassSchedules(data);
        const conflicts = writeConflicts(data);
        setMessages(conflicts);
      } else {
        console.log('Failed to fetch class schedules');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  useEffect(() => {
    fetchClassSchedules();
  }, []);

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

  useEffect(() => {
    fetchReservations();
  }, [selectedRoom]);

  function parseTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes, seconds);
  }

  function compareTime(time1, time2) {
    return time1.getTime() - time2.getTime();
  }

  const handleConfirmDelete = () => {
    if (selectedReservation) {
      try {
        axios
          .delete(
            `http://localhost:8080/delete_schedule/${selectedReservation.id}`
          )
          .then(() => {
            fetchReservations();
            fetchClassSchedules();
          })
          .catch((error) => {
            console.log('Wystąpił błąd podczas usuwania planu:', error);
          });
      } catch (error) {
        console.log('Wystąpił błąd podczas usuwania planu:', error);
      }
    }
    setShowConfirmation(false);
  };

  const hasConflicts = (reservation, allReservations) => {
    const conflictingReservations = allReservations.filter(
      (otherReservation) => {
        if (reservation.id === otherReservation.id) {
          return false; // Ignoruj ten sam plan zajęć
        }

        const sameDayOfWeek =
          reservation.day_of_week === otherReservation.day_of_week;

        const reservationWeeks = getWeeksArray(
          reservation.start_week,
          reservation.end_week,
          reservation.is_parity
        );
        const otherReservationWeeks = getWeeksArray(
          otherReservation.start_week,
          otherReservation.end_week,
          otherReservation.is_parity
        );

        const overlappingWeeks = reservationWeeks.some((week) =>
          otherReservationWeeks.includes(week)
        );

        const overlappingTime =
          (reservation.start_time < otherReservation.end_time &&
            otherReservation.start_time <= reservation.start_time) ||
          (otherReservation.start_time < reservation.end_time &&
            reservation.start_time <= otherReservation.start_time);

        const sameRoom = reservation.room.name === otherReservation.room.name;
        const sameUser = reservation.user.id === otherReservation.user.id;
        const sameTime = sameDayOfWeek && overlappingWeeks && overlappingTime;
        const sameGroup =
          reservation.deanGroup.id === otherReservation.deanGroup.id;

        return (
          (sameTime && sameRoom === true && sameUser === false) ||
          (sameTime && sameRoom === true && sameUser === true) ||
          (sameTime && sameRoom === false && sameUser === true) ||
          (sameTime &&
            sameRoom === false &&
            sameUser === false &&
            sameGroup == true)
        );
      }
    );

    return conflictingReservations.length > 0;
  };

  const getWeeksArray = (startWeek, endWeek, isParity) => {
    const weeks = [];

    if (isParity === 1) {
      // Tylko nieparzyste tygodnie
      for (let week = startWeek; week <= endWeek; week++) {
        if (week % 2 !== 0) {
          weeks.push(week);
        }
      }
    } else if (isParity === 2) {
      // Tylko parzyste tygodnie
      for (let week = startWeek; week <= endWeek; week++) {
        if (week % 2 === 0) {
          weeks.push(week);
        }
      }
    } else if (isParity === 0) {
      // Wszystkie tygodnie
      for (let week = startWeek; week <= endWeek; week++) {
        weeks.push(week);
      }
    }

    return weeks;
  };

  const findschedules = (reservation, allReservations) => {
    const conflictingReservations = allReservations.filter(
      (otherReservation) => {
        if (reservation.id === otherReservation.id) {
          return false;
        }

        const sameDayOfWeek = day === otherReservation.day_of_week;

        const reservationWeeks = getWeeksArray(
          reservation.start_week,
          reservation.end_week,
          reservation.is_parity
        );
        const otherReservationWeeks = getWeeksArray(
          otherReservation.start_week,
          otherReservation.end_week,
          otherReservation.is_parity
        );

        const overlappingWeeks = reservationWeeks.some((week) =>
          otherReservationWeeks.includes(week)
        );

        const start = startingTimeSlots[timeindex];
        const end =
          endingTimeSlots[timeindex + parseInt(reservation.hours) - 1];
        const overlappingTime =
          (start < otherReservation.end_time &&
            otherReservation.start_time <= start) ||
          (otherReservation.start_time < end &&
            start <= otherReservation.start_time);

        const sameRoom = selectedRoom === otherReservation.room.name;
        const sameUser = reservation.user.id === otherReservation.user.id;
        const sameTime = sameDayOfWeek && overlappingWeeks && overlappingTime;
        const sameGroup =
          reservation.deanGroup.id === otherReservation.deanGroup.id;

        return (
          (sameTime && sameRoom === true && sameUser === false) ||
          (sameTime && sameRoom === true && sameUser === true) ||
          (sameTime && sameRoom === false && sameUser === true) ||
          (sameTime &&
            sameRoom === false &&
            sameUser === false &&
            sameGroup == true)
        );
      }
    );

    return conflictingReservations.length > 0;
  };

  const writeConflicts = (data) => {
    const conflicts = [];
    let licznik_poj = 0;
    let licznik = 0;
    for (let i = 0; i < data.length - 1; i++) {
      const reservationA = data[i];
      for (let j = i + 1; j < data.length; j++) {
        licznik_poj = 0;
        const reservationB = data[j];
        if (reservationA.id === reservationB.id) {
          continue;
        }
        const first =
          reservationA.room.name +
          '/' +
          reservationA.course.name +
          '/' +
          reservationA.start_time +
          '-' +
          reservationA.end_time +
          '/' +
          reservationA.user.last_name;
        const second =
          reservationB.room.name +
          '/' +
          reservationB.course.name +
          '/' +
          reservationB.start_time +
          '-' +
          reservationB.end_time +
          '/' +
          reservationB.user.last_name;

        const sameDayOfWeek =
          reservationA.day_of_week === reservationB.day_of_week;

        const reservationWeeks = getWeeksArray(
          reservationA.start_week,
          reservationA.end_week,
          reservationA.is_parity
        );
        const otherReservationWeeks = getWeeksArray(
          reservationB.start_week,
          reservationB.end_week,
          reservationB.is_parity
        );

        const overlappingWeeks = reservationWeeks.some((week) =>
          otherReservationWeeks.includes(week)
        );

        const overlappingTime =
          (reservationA.start_time < reservationB.end_time &&
            reservationB.start_time <= reservationA.start_time) ||
          (reservationB.start_time < reservationA.end_time &&
            reservationA.start_time <= reservationB.start_time);

        const sameRoom = reservationA.room.name === reservationB.room.name;
        const sameUser = reservationA.user.id === reservationB.user.id;
        const sameTime = sameDayOfWeek && overlappingWeeks && overlappingTime;
        const sameGroup =
          reservationA.deanGroup.id === reservationB.deanGroup.id;

        if (sameTime && sameRoom === true && sameUser === false) {
          licznik = licznik + 1;
          if (licznik_poj === 0) {
            licznik_poj = 1;

            conflicts.push(first + ' : ' + second);
          }
          if (sameGroup === true)
            conflicts.push(
              'Konflikt: różni prowadzący ,ta sama grupa w tej samej sali i czasie.'
            );
          else
            conflicts.push(
              'Konflikt: różni prowadzący, różne grupy w tej samej sali i czasie.'
            );
        } else if (sameTime && sameRoom === true && sameUser === true) {
          licznik = licznik + 1;
          if (licznik_poj === 0) {
            licznik_poj = 1;

            conflicts.push(first + ' : ' + second);
          }

          if (sameGroup === true)
            conflicts.push(
              'Konflikt: ten sam prowadzący, ta sama grupa w tej samej sali i czasie.'
            );
          else
            conflicts.push(
              'Konflikt: ten sam prowadzący, różne grupy w tej samej sali i czasie.'
            );
        } else if (sameTime && sameRoom === false && sameUser === true) {
          licznik = licznik + 1;
          if (licznik_poj === 0) {
            licznik_poj = 1;

            conflicts.push(first + ' : ' + second);
          }
          if (sameGroup === true)
            conflicts.push(
              'Konflikt: ten sam prowadzący, ta sama grupa w różnych salach i w tym samym czasie.'
            );
          else
            conflicts.push(
              'Konflikt: ten sam prowadzący, różne grupy w różnych salach i w tym samym czasie.'
            );
        } else if (
          sameTime &&
          sameRoom === false &&
          sameUser === false &&
          sameGroup === true
        ) {
          licznik = licznik + 1;
          if (licznik_poj === 0) {
            licznik_poj = 1;

            conflicts.push(first + ' : ' + second);
          }
          conflicts.push(
            'Konflikt: Ta sama grupa dziekańska w tym samym czasie.'
          );
        }
      }
    }
    setCountConflicts(licznik);
    if (licznik === 0) {
      conflicts.push('Brak konfliktów');
    } else {
      conflicts.push('Liczba konfliktów: ' + licznik);
    }
    return conflicts;
  };

  function generateTable() {
    const room = roomList.find((option) => option.name === selectedRoom);
    const roomText = room ? room.name : '';
    return (
      <div className='card justfiy-content-center align-items-center text-white bg-dark mb-3'>
        <div className='card-title'>{roomText}</div>
        <div className='card-body'>
          <div className='table table-responsive table-striped'>
            {generateTableHeader()}
            {generateTableContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid background'>
      <ToastContainer />

      <div className='row'>
        <div className='d-inline-flex justify-content-center'>
          <div className='col-2 mb-3 mx-2 d-flex flex-column p-3'>
            <label className='text-center' htmlFor='room'>
              Wybór sali
            </label>
            <select
              className='form-select d-block w-100 mt-1'
              value={selectedRoom}
              onChange={handleSelectedRoom}>
              <option value='no-room-selected'>Wybierz jedną z opcji...</option>
              {roomList.map((room) => (
                <option key={room.value} value={room.value}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-2 mb-3 mx-2 d-flex flex-column p-3'>
            <button
              className='btn btn-primary'
              onClick={generateOptimizedClassSchedules}>
              Generowanie planu zajęć
            </button>
          </div>
          <div className='col-2 mb-3 mx-2 d-flex flex-column p-3'>
            <button className='btn btn-primary' onClick={shuffleClassSchedules}>
              Losowanie planu zajęć
            </button>
          </div>
        </div>
      </div>

      {generateTable()}

      <div className='logger'>
        {messages.map((message, index) => (
          <p
            key={index}
            style={{ color: countConflicts === 0 ? 'green' : 'red' }}>
            {message}
          </p>
        ))}
      </div>

      {showConfirmation && (
        <div className='confirmation-modal'>
          <div className='confirmation-modal-content'>
            <p>Czy na pewno chcesz usunąć ten plan zajęć?</p>
            <div className='confirmation-buttons'>
              <button className='btn btn-danger' onClick={handleConfirmDelete}>
                Tak
              </button>
              <button
                className='btn btn-secondary'
                onClick={handleCancelDelete}>
                Nie
              </button>
            </div>
          </div>
        </div>
      )}

      {showSelector && (
        <div className='selector-modal'>
          <div className='selector-modal-content'>
            <p>Wybierz plan zajęć:</p>
            <div className='selector-options' style={{ marginBottom: '10px' }}>
              <select
                value={selectedSchedule}
                onChange={handleSelectedSchedule}>
                <option value='no-class_schedules-selected'>
                  Wybierz jedną z opcji...
                </option>
                {classSchedules
                  .filter(
                    (schedule) =>
                      (schedule.day_of_week === day &&
                        schedule.room.name === selectedRoom &&
                        compareTime(
                          parseTime(startingTimeSlots[timeindex]),
                          parseTime(schedule.start_time)
                        ) === 0) === false &&
                      findschedules(schedule, classSchedules) === false &&
                      timeindex + parseInt(schedule.hours) <= 12
                  )
                  .map((schedule) => (
                    <option key={schedule.id} value={schedule.id}>
                      {schedule.room.name}/{schedule.course.name}/
                      {schedule.start_time}-{schedule.end_time}/
                      {schedule.user.last_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='button-container'>
              <button
                className='btn btn-primary'
                onClick={handleAddClassSchedule}>
                Potwierdź
              </button>
              <button
                className='btn btn-primary'
                style={{ marginLeft: '10px' }}
                onClick={handleCancelAdd}>
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
