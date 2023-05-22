import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';

function Class_schedule() {
  const [classScheduleList, setClassScheduleList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTimeDateId, setNewTimeDateId] = useState('');
  const [newCourseId, setNewCourseId] = useState('');
  const [newRoomId, setNewRoomId] = useState('');
  const [newDayOfWeek, setNewDayOfWeek] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [newStartWeek, setNewStartWeek] = useState('');
  const [newEndWeek, setNewEndWeek] = useState('');
  const [newIsParity, setNewIsParity] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [coursesList, setCourseList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [userCourseList, setUserCourseList] = useState([]);
  const [dayOfWeeks, setDayOfWeek] = useState([
    { id: 1, name: 'Poniedziałek' },
    { id: 2, name: 'Wtorek' },
    { id: 3, name: 'Środa' },
    { id: 4, name: 'Czwartek' },
    { id: 5, name: 'Piątek' },
  ]);
  const [isParity, setisParity] = useState([
    { id: 0, name: '-' },
    { id: 1, name: 'x1' },
    { id: 2, name: 'x2' },
  ]);

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

  useEffect(() => {
    loadClassSchedules();
    loadCourses();
    loadRooms();
  }, []);

  useEffect(() => {
    console.log(newStartTime);
  }, [newStartTime]);

  const loadClassSchedules = async () => {
    const result = await axios.get('http://localhost:8080/class_schedules');
    setClassScheduleList(result.data);
  };

  const loadCourses = async () => {
    const result = await axios.get('http://localhost:8080/courses');
    setCourseList(result.data);
  };

  const loadUserCourse = async (courseId) => {
    const result = await axios.get(
      `http://localhost:8080/users/byCourse/${courseId}`
    );
    setUserCourseList(result.data);
  };

  const loadRooms = async () => {
    const result = await axios.get('http://localhost:8080/rooms');
    setRoomList(result.data);
  };

  const handleAddClassSchedule = () => {
    setShowForm(true);
  };

  const handleTimeDateIdChange = (event) => {
    setNewTimeDateId(event.target.value);
  };

  const handleCourseIdChange = (event) => {
    setNewCourseId(event.target.value);
    console.log(event.target.value);
    loadUserCourse(event.target.value);
    console.log(userCourseList);
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

  const handleIsParityChange = (event) => {
    setNewIsParity(event.target.value);
  };

  const handleNewUserId = (event) => {
    setNewUserId(event.target.value);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newClassScheduleId = classScheduleList.length + 1;
    const newClassSchedule = {
      id: newClassScheduleId,
      day_of_week: newDayOfWeek,
      start_time: findStartTimeById(newStartTime),
      end_time: findEndTimeById(newEndTime),
      start_week: newStartWeek,
      end_week: newEndWeek,
      is_parity: newIsParity,
      course: { id: newCourseId },
      room: { id: newRoomId },
      user: { id: newUserId },
    };

    try {
      console.log(newClassSchedule);
      await axios.post(
        'http://localhost:8080/new_classSchedule',
        newClassSchedule
      );
      setClassScheduleList([...classScheduleList, newClassSchedule]);
      handleCancel();
      loadClassSchedules();
    } catch (error) {
      console.error('Error while adding class schedule', error);
    }
  };

  const handleCancel = () => {
    setNewTimeDateId('');
    setNewCourseId('');
    setNewRoomId('');
    setNewDayOfWeek('');
    setNewStartTime('');
    setNewEndTime('');
    setNewStartWeek('');
    setNewEndWeek('');
    setNewIsParity('');
    setShowForm(false);
  };

  function enableScroll() {
    document.body.classList.remove('disable-scroll');
  }

  function disableScroll() {
    document.body.classList.add('disable-scroll');
  }

  if (showForm) {
    disableScroll();
  } else {
    enableScroll();
  }

  return (
    <div className='room-wrapper'>
      <h2 className='room-title'>Lista planów zajęć</h2>
      <div className='horizontal-line'></div>
      <table className='room-table'>
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Prowadzący</th>
            <th>Przedmiot</th>
            <th>Pokój</th>
            <th>Dzień tygodnia</th>
            <th>Początek - czas</th>
            <th>Koniec - czas</th>
            <th>Początek - tydzień</th>
            <th>Koniec - tydzień</th>
            <th>Parzystość</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {classScheduleList.map((classSchedule, index) => (
            <tr key={classSchedule.id}>
              <td>{index + 1}.</td>
              <td>{classSchedule.user.email}</td>
              <td>{classSchedule.course.name}</td>
              <td>{classSchedule.room.name}</td>
              <td>{getDayOfWeekName(classSchedule.day_of_week)}</td>
              <td>{classSchedule.start_time}</td>
              <td>{classSchedule.end_time}</td>
              <td>{classSchedule.start_week}</td>
              <td>{classSchedule.end_week}</td>
              <td>{getisParityName(classSchedule.is_parity)}</td>
              <td>
                <button className='btn btn-primary mx-2'>Edit</button>
                <button className='btn btn-danger mx-2'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='add-button-wrapper'>
        <button className='add-button' onClick={handleAddClassSchedule}>
          Dodaj
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className={showForm ? 'add-form' : 'hidden'}>
          <div className='form-group'>
            <label htmlFor='newCourseId'>Nazwa przedmiotu:</label>
            <select
              className='form-select'
              id='newCourseId'
              value={newCourseId}
              onChange={handleCourseIdChange}>
              <option value=''>Wybierz przedmiot</option>
              {coursesList.map((courses) => (
                <option key={courses.id} value={courses.id}>
                  {courses.name}
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
                  disabled={
                    newEndTime !== '' && newEndTime <= startTime.id - 1
                  }>
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
          <div className='form-group'>
            <label htmlFor='newUserId'>Prowadzący:</label>
            <select
              className='form-select'
              id='newUserId'
              value={newUserId}
              onChange={handleNewUserId}>
              {userCourseList.length === 0 ? (
                <option value=''>
                  Ten przedmiot nie ma przypisanych prowadzących
                </option>
              ) : (
                <>
                  <option value=''>Wybierz prowadzącego</option>
                  {userCourseList.map((userCourse) => (
                    <option key={userCourse.user.id} value={userCourse.user.id}>
                      {userCourse.user.first_name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className='form-buttons'>
            <button type='submit' className='add-button'>
              Dodaj
            </button>
            <button
              type='button'
              className='cancel-button'
              onClick={handleCancel}>
              Anuluj
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Class_schedule;
