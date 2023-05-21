import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';

function UserCourses() {
  const [userCoursesList, setUserCoursesList] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const [userCourse, setUserCourse] = useState({
    user: [],
    course: [],
  });

  useEffect(() => {
    loadUserCourses();
    loadUsers();
    loadCourses();
  }, []);

  useEffect(() => {
    console.log(userCourse);
  }, [userCourse]);

  const loadUserCourses = async () => {
    const result = await axios.get('http://localhost:8080/user_course');
    setUserCoursesList(result.data);
  };

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8080/users');
    setUsers(result.data);
  };

  const loadCourses = async () => {
    const result = await axios.get('http://localhost:8080/courses');
    setCourses(result.data);
  };

  const setNewUser = (email) => {
    const selectedUserObj = users.find((user) => user.email === email);
    setUserCourse((userCourse) => ({
      ...userCourse,
      user: selectedUserObj,
    }));
  };

  const setNewCourse = (name) => {
    const selectedCourseObj = courses.find((course) => course.name === name);
    setUserCourse((userCourse) => ({
      ...userCourse,
      course: selectedCourseObj,
    }));
  };

  const handleCancel = () => {
    setShowForm(false);
    setUserCourse({
      user: [],
      course: [],
    });
    setSelectedUser('');
    setSelectedCourse('');
  };

  const handleAddUserCourse = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/new_userCourse',
        userCourse
      );
      // Handle successful response
      console.log('User course created:', response.data);
      handleCancel();
    } catch (error) {
      // Handle error
      console.error('Error creating user course:');
    }
  };

  const generateCourseType = (courseType) => {
    switch (courseType) {
      case 0:
        return 'Laboratorium';
      case 1:
        return 'Wykład';
      default:
        break;
    }
  };

  function generateUserCoursesDisplay() {
    return (
      <>
        <h2 className='room-title'>Lista Udogodnień</h2>
        <div className='horizontal-line'></div>
        <table className='room-table'>
          <thead>
            <tr>
              <th scope='col'>Lp.</th>
              <th scope='col'>Imię</th>
              <th scope='col'>Nazwisko</th>
              <th scope='col'>E-mail</th>
              <th scope='col'>Nazwa kursu</th>
              <th scope='col'>Rodzaj kursu</th>
              <th scope='col'>Rodzaj pokoju</th>
              <th scope='col'>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {userCoursesList.map((userCourse, index) => (
              <tr key={userCourse.id}>
                <td>{index + 1}.</td>
                <td>{userCourse.user.first_name}</td>
                <td>{userCourse.user.last_name}</td>
                <td>{userCourse.user.email}</td>
                <td>{userCourse.course.name}</td>
                <td>{generateCourseType(userCourse.course.course_type)}</td>
                <td>{userCourse.course.roomType.room_name}</td>
                <td>
                  <button className='btn btn-primary mx-2'>Edit</button>
                  <button className='btn btn-danger mx-2'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='add-button-wrapper'>
          <button className='add-button' onClick={handleAddUserCourse}>
            Dodaj
          </button>
        </div>
      </>
    );
  }

  function generateNewUserCourseForm() {
    return (
      <>
        {showForm && (
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={showForm ? 'add-form' : 'hidden'}>
            <h2 className='text-center m-4'>Nowe połączenie użytkownik-kurs</h2>

            <div className='form-group'>
              <label htmlFor='User' className='form-label'>
                Użytkownik:
              </label>
              <select
                className='form-select'
                value={selectedUser}
                onChange={(e) => {
                  setSelectedUser(e.target.value);
                  setNewUser(e.target.value);
                }}>
                <option value='no-room-type-selected'>
                  Wybierz jedną z opcji...
                </option>
                {users.map((user) => (
                  <option value={user.value}>{user.email}</option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='Course' className='form-label'>
                Kurs:
              </label>
              <select
                className='form-select'
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setNewCourse(e.target.value);
                }}>
                <option value='no-room-type-selected'>
                  Wybierz jedną z opcji...
                </option>
                {courses.map((course) => (
                  <option value={course.value}>{course.name}</option>
                ))}
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
      </>
    );
  }

  return (
    <div className='room-wrapper'>
      {generateUserCoursesDisplay()}
      {generateNewUserCourseForm()}
    </div>
  );
}

export default UserCourses;
