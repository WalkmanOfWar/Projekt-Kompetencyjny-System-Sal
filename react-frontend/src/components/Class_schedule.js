import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'react-hook-form';

function Class_schedule() {
  const [sortBy, setSortBy] = useState('');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };
  const [classScheduleList, setClassScheduleList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSchedule, setEditSchedule] = useState(null);

  const [newCourseId, setNewCourseId] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [newRoomId, setNewRoomId] = useState('');
  const [newDayOfWeek, setNewDayOfWeek] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [newStartWeek, setNewStartWeek] = useState('');
  const [newEndWeek, setNewEndWeek] = useState('');
  const [newIsParity, setNewIsParity] = useState('');
  const [coursesList, setCourseList] = useState([]);

  const [roomList, setRoomList] = useState([]);
  const [userCourseList, setUserCourseList] = useState([]);
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

  useEffect(() => {
    loadClassSchedules();
    loadCourses();
    loadRooms();
  }, []);


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
      `http://localhost:8080/userCourse/byCourseId/${courseId}`
    );
    setUserCourseList(result.data);
  };

  const loadRooms = async () => {
    const result = await axios.get('http://localhost:8080/rooms');
    setRoomList(result.data);
  };

  const handleAddClassSchedule = () => {
    setEditSchedule(null);
    setShowForm(true);
  };

  const handleCourseIdChange = (event) => {
    setNewCourseId(event.target.value);
    loadUserCourse(event.target.value);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (editSchedule) {
      const updatedSchedule = {
        id: editSchedule.id,
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
        console.log(updatedSchedule);
        await axios.put(
          `http://localhost:8080/class_schedules/${editSchedule.id}`,
          updatedSchedule
        );
        setEditSchedule(null);
        toast.success('Zaktualizowano plan zajęć');
      } catch (error) {
        console.log(error);
        toast.error('Wystąpił błąd podczas aktualizacji planu zajęć');
      }
    } else {
      const newClassSchedule = {
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
        await axios.post('http://localhost:8080/new_classSchedule', newClassSchedule);
        setClassScheduleList([...classScheduleList, newClassSchedule]);
        toast.success('Dodano nowy plan zajęć');
      } catch (error) {
        console.log(error);
        toast.error('Wystąpił błąd podczas dodawania nowego planu zajęć');
      }
    }
  
    handleCancel();
    loadClassSchedules();
  };
  

  const handleCancel = () => {
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

  const handleDeleteSchedule = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/delete_schedule/${courseId}`);
      loadClassSchedules();
      toast.success('Plan został usunięty.');
    } catch (error) {
      console.log('Wystąpił błąd podczas usuwania planu:', error);
      toast.error('Wystąpił błąd podczas usuwania .');
    }
  };

  const handleEditSchedule = (scheduleID) => {
    const schedule = classScheduleList.find(
      (schedule) => schedule.id === scheduleID
    );
    setEditSchedule(schedule);
    setNewCourseId(schedule.course.id);
    setNewRoomId(schedule.room.id);
    setNewDayOfWeek(schedule.day_of_week);
    setNewStartTime(schedule.start_time);
    setNewEndTime(schedule.end_time);
    setNewStartWeek(schedule.start_week);
    setNewEndWeek(schedule.end_week);
    setNewIsParity(schedule.is_parity);
    setNewUserId(schedule.user.id);
    loadUserCourse(schedule.course.id);

    setShowForm(true);
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

  const generateClassSchedulesDisplay = () => {
    let sortedClassSchedules = [...classScheduleList];
    if (sortBy === 'user') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) =>
        a.user.email.localeCompare(b.user.email)
      );
    } else if (sortBy === 'room') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) =>
        a.room.name.localeCompare(b.room.name)
      );
    } else if (sortBy === 'course') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) =>
        a.course.name.localeCompare(b.course.name)
      );
    } else if (sortBy === 'parity') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) =>
        getisParityName(a.is_parity).localeCompare(getisParityName(b.is_parity))
      );
    } else if (sortBy === 'day') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) =>
        getDayOfWeekName(a.day_of_week).localeCompare(
          getDayOfWeekName(b.day_of_week)
        )
      );
    } else if (sortBy === 'startTime') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) =>
        a.start_time.localeCompare(b.start_time)
      );
    } else if (sortBy === 'endTime') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) =>
        a.end_time.localeCompare(b.end_time)
      );
    } else if (sortBy === 'startWeek') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) => {
        return a.start_week - b.start_week;
      });
    } else if (sortBy === 'endWeek') {
      sortedClassSchedules = sortedClassSchedules.sort((a, b) => {
        return a.end_week - b.end_week;
      });
    }
    return (
      <>
        <h2 className='room-title'>Lista planów zajęć</h2>
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
          </select>
        </div>
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
            {sortedClassSchedules.map((classSchedule, index) => (
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
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleEditSchedule(classSchedule.id)}>
                    Edit
                  </button>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => handleDeleteSchedule(classSchedule.id)}>
                    Delete
                  </button>
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
            className={showForm ? 'add-form' : 'hidden'}
            style={{ paddingTop: '300px', paddingBottom: '100px' }}>
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
                {editSchedule ? 'Zaktualizuj' : 'Dodaj'}
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
      </>
    );
  };

  return (
    <div className='room-wrapper'>
      {generateClassSchedulesDisplay()}
      <ToastContainer />
    </div>
  );
}

export default Class_schedule;
