import React, { useEffect, useState } from 'react';
import './ProfileInfo.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function ProfileAddReservation() {
  const [classScheduleList, setClassScheduleList] = useState([]);
  const [editSchedule, setEditSchedule] = useState(null);

  const [newCourseId, setNewCourseId] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [newRoomId, setNewRoomId] = useState('');
  const [newDayOfWeek, setNewDayOfWeek] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [newStartWeek, setNewStartWeek] = useState('');
  const [newEndWeek, setNewEndWeek] = useState('');
  const [newHours, setNewHours] = useState('');

  const [newIsParity, setNewIsParity] = useState('');

  const [roomList, setRoomList] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const dayOfWeeks = [
    { id: 1, name: 'Poniedziałek' },
    { id: 2, name: 'Wtorek' },
    { id: 3, name: 'Środa' },
    { id: 4, name: 'Czwartek' },
    { id: 5, name: 'Piątek' },
  ];
  const isParity = [
    { id: 0, name: '-' },
    { id: 1, name: 'x1' },
    { id: 2, name: 'x2' },
  ];

  const startingTimeSlots = [
    { id: 0, text: '08:15:00' },
    { id: 1, text: '09:15:00' },
    { id: 2, text: '10:15:00' },
    { id: 3, text: '11:15:00' },
    { id: 4, text: '12:15:00' },
    { id: 5, text: '13:15:00' },
    { id: 6, text: '14:15:00' },
    { id: 7, text: '15:15:00' },
    { id: 8, text: '16:15:00' },
    { id: 9, text: '17:15:00' },
    { id: 10, text: '18:15:00' },
    { id: 11, text: '19:15:00' },
  ];

  const endingTimeSlots = [
    { id: 0, text: '09:00:00' },
    { id: 1, text: '10:00:00' },
    { id: 2, text: '11:00:00' },
    { id: 3, text: '12:00:00' },
    { id: 4, text: '13:00:00' },
    { id: 5, text: '14:00:00' },
    { id: 6, text: '15:00:00' },
    { id: 7, text: '16:00:00' },
    { id: 8, text: '17:00:00' },
    { id: 9, text: '18:00:00' },
    { id: 10, text: '19:00:00' },
    { id: 11, text: '20:00:00' },
  ];

  const getDayOfWeekName = (dayOfWeekId) => {
    const dayOfWeek = dayOfWeeks.find((day) => day.id === dayOfWeekId);
    return dayOfWeek ? dayOfWeek.name : '';
  };

  const getisParityName = (is_parity) => {
    const temp = isParity.find((p) => p.id === is_parity);
    return temp ? temp.name : '';
  };

  const findStartTimeById = (id) => {
    const result = startingTimeSlots.find(
      (timeSlot) => timeSlot.id === parseInt(id)
    );
    return result ? result.text : null;
  };

  const findEndTimeById = (id) => {
    const result = endingTimeSlots.find(
      (timeSlot) => timeSlot.id === parseInt(id)
    );
    return result ? result.text : null;
  };

  function getIdByValueStartingTime(value) {
    const slot = startingTimeSlots.find((slot) => slot.text === value);
    return slot ? slot.id : null;
  }

  function getIdByValueEndingTime(value) {
    const slot = endingTimeSlots.find((slot) => slot.text === value);
    return slot ? slot.id : null;
  }

  useEffect(() => {
    loadClassSchedules();
    loadUserCourses();
    loadRooms();
  }, []);

  const loadUserCourses = async () => {
    const userID = JSON.parse(localStorage.getItem('user')).id;
    const result = await axios.get(
      `http://localhost:8080/user_courses/${userID}`
    );
    console.log(result.data);
    setUserCourses(result.data);
  };

  const loadClassSchedules = async () => {
    const result = await axios.get('http://localhost:8080/class_schedules');
    setClassScheduleList(result.data);
  };

  const loadRooms = async () => {
    const result = await axios.get('http://localhost:8080/rooms');
    setRoomList(result.data);
  };

  const handleAddClassSchedule = () => {
    setEditSchedule(null);
  };

  const handleCourseIdChange = (event) => {
    setNewCourseId(event.target.value);
  };

  const handleRoomIdChange = (event) => {
    setNewRoomId(event.target.value);
  };

  const handleDayOfWeekChange = (event) => {
    setNewDayOfWeek(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setNewStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setNewEndTime(event.target.value);
  };

  const handleStartWeekChange = (event) => {
    setNewStartWeek(event.target.value);
  };

  const handleEndWeekChange = (event) => {
    setNewEndWeek(event.target.value);
  };

  const handleHoursChange = (event) => {
    setNewHours(event.target.value);
  };

  const handleIsParityChange = (event) => {
    setNewIsParity(event.target.value);
  };

  const handleNewUserId = (event) => {
    setNewUserId(event.target.value);
  };
  function parsesTime(timeString) {
    if (timeString === null) return 0;
    const [hours] = timeString.split(':');
    return hours;
  }

  const request = {
    dayOfWeek: newDayOfWeek,
    startTime: newStartTime,
    endTime: newEndTime,
    startWeek: newStartWeek,
    endWeek: newEndWeek,
    isParity: newIsParity,
    courseId: newCourseId,
    roomId: newRoomId,
    userId: newUserId,
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(request);
    if (
      newDayOfWeek !== '' &&
      newStartTime !== '' &&
      newEndTime !== '' &&
      newStartWeek !== '' &&
      newEndWeek !== '' &&
      newIsParity !== '' &&
      newCourseId !== '' &&
      newRoomId !== ''
    ) {
      const diffInMillis =
        parsesTime(findEndTimeById(newEndTime)) -
        parsesTime(findStartTimeById(newStartTime));
      const hoursString = Math.ceil(diffInMillis).toString();
      const newClassSchedule = {
        day_of_week: newDayOfWeek,
        start_time: findStartTimeById(newStartTime),
        end_time: findEndTimeById(newEndTime),
        start_week: newStartWeek,
        end_week: newEndWeek,
        is_parity: newIsParity,
        hours: hoursString,
        course: { id: newCourseId },
        room: { id: newRoomId },
        user: { id: JSON.parse(localStorage.getItem('user')).id },
      };

      try {
        console.log(newClassSchedule);
        await axios.post(
          'http://localhost:8080/new_classSchedule',
          newClassSchedule
        );
        toast.success('Dodano rezerwację do listy oczekujących', {
          autoClose: 1000,
        });
        handleCancel();
      } catch (error) {
        console.log(error);
        toast.error('Wystąpił błąd podczas dodawania nowej rezerwacji zajęć', {
          autoClose: 1000,
        });
      }
    } else {
      toast.error('Wszystkie pola muszą być wypełnione', {
        autoClose: 1000,
      });
    }
  };

  const handleCancel = () => {
    setNewCourseId('');
    setNewRoomId('');
    setNewDayOfWeek('');
    setNewStartTime('');
    setNewEndTime('');
    setNewStartWeek('');
    setNewEndWeek('');
    setNewHours('');
    setNewIsParity('');
  };

  return (
    <>
      {' '}
      <form onSubmit={handleFormSubmit} style={{ marginLeft: '250px' }}>
        <div className='form-group'>
          <label htmlFor='newCourseId'>Wybierz przedmiot:</label>
          <select
            className='form-select'
            id='newCourseId'
            value={newCourseId}
            onChange={handleCourseIdChange}>
            <option value=''>Wybierz przedmiot</option>
            {userCourses.map((userCourse) => (
              <option key={userCourse.course.id} value={userCourse.course.id}>
                {userCourse.course.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='newRoomId'>Sala:</label>
          <select
            className='form-select'
            id='newRoomId'
            value={newRoomId}
            onChange={handleRoomIdChange}>
            <option value=''>Wybierz sale</option>
            {roomList.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='newDayOfWeek'>Dzień tygodnia:</label>
          <select
            className='form-select'
            id='newDayOfWeek'
            value={newDayOfWeek}
            onChange={handleDayOfWeekChange}
            min='0'>
            <option value=''>Wybierz dzień</option>
            {dayOfWeeks.map((dayOfWeek) => (
              <option key={dayOfWeek.id} value={dayOfWeek.id}>
                {dayOfWeek.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='newStartTime'>Czas rozpoczęcia:</label>
          <select
            className='form-select'
            id='newStartTime'
            value={newStartTime}
            onChange={handleStartTimeChange}
            min='0'>
            <option value=''>Wybierz czas rozpoczęcia</option>
            {startingTimeSlots.map((startTime) => (
              <option
                key={startTime.id}
                value={startTime.id}
                disabled={newEndTime !== '' && newEndTime <= startTime.id - 1}>
                {startTime.text}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='newEndTime'>Czas zakończenia:</label>
          <select
            className='form-select'
            id='newEndTime'
            value={newEndTime}
            onChange={handleEndTimeChange}
            min='0'>
            <option value=''>Wybierz czas zakończenia</option>
            {endingTimeSlots.map((endTime) => (
              <option
                key={endTime.id}
                value={endTime.id}
                disabled={
                  newStartTime !== '' && newStartTime >= endTime.id + 1
                }>
                {endTime.text}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='newStartWeek'>Początkowy tydzień:</label>
          <select
            className='form-select'
            id='newStartWeek'
            value={newStartWeek}
            onChange={handleStartWeekChange}
            min='0'>
            <option value=''>Wybierz początkowy tydzień</option>
            {[...Array(15)].map((_, index) => (
              <option
                key={index + 1}
                value={index + 1}
                disabled={newEndWeek !== '' && newEndWeek <= index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='newEndWeek'>Końcowy tydzień:</label>
          <select
            className='form-select'
            id='newEndWeek'
            value={newEndWeek}
            onChange={handleEndWeekChange}
            min='0'>
            <option value=''>Wybierz końcowy tydzień</option>
            {[...Array(15)].map((_, index) => (
              <option
                key={index + 1}
                value={index + 1}
                disabled={newStartWeek !== '' && newStartWeek >= index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='newIsParity'>Parzystość:</label>
          <select
            className='form-select'
            id='newIsParity'
            value={newIsParity}
            onChange={handleIsParityChange}>
            <option value=''>Wybierz parzystość</option>
            {isParity.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-buttons'>
          <button type='submit' className='add-button'>
            {editSchedule ? 'Zaktualizuj' : 'Dodaj'}
          </button>
          <button
            type='button'
            className='cancel-button'
            onClick={handleCancel}>
            Zacznij od nowa
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default ProfileAddReservation;
