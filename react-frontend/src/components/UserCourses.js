import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    loadUserCourses();
    loadUsers();
    loadCourses();
  }, []);

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
      if (userCourse.id) {
        // Edit mode: Update existing user course
        const response = await axios.put(
          `http://localhost:8080/user_course/${userCourse.id}`,
          userCourse
        );
        console.log('User course updated:', response.data);
        toast.success('User course updated successfully');
      } else {
        // Add mode: Create new user course
        const response = await axios.post(
          'http://localhost:8080/new_userCourse',
          userCourse
        );
        console.log('User course created:', response.data);
        toast.success('User course added successfully');
      }

      handleCancel();
      loadUserCourses();
    } catch (error) {
      console.error('Error creating/updating user course:', error);
      toast.error('Failed to add/update user course');
    }
  };

  const handleEditUserCourse = (userCourse) => {
    setShowForm(true);
    setSelectedUser(userCourse.user.email);
    setSelectedCourse(userCourse.course.name);
    setUserCourse(userCourse);
  };

  const handleDeleteUserCourse = async (userCourseId) => {
    try {
      await axios.delete(`http://localhost:8080/user_course/${userCourseId}`);
      console.log('User course deleted');
      toast.success('User course deleted successfully');
      loadUserCourses();
    } catch (error) {
      console.error('Error deleting user course:', error);
      toast.error('Failed to delete user course');
    }
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const generateCourseType = (courseType) => {
    switch (courseType) {
      case 0:
        return 'Laboratorium';
      case 1:
        return 'Wykład';
      default:
        return '';
    }
  };

  const generateUserCoursesDisplay = () => {
    let sortedUserCoursesList = [...userCoursesList];

    if (sortBy === 'courseName') {
      sortedUserCoursesList = sortedUserCoursesList.sort((a, b) =>
        a.course.name.localeCompare(b.course.name)
      );
    } else if (sortBy === 'email') {
      sortedUserCoursesList = sortedUserCoursesList.sort((a, b) =>
        a.user.email.localeCompare(b.user.email)
      );
    }

    return (
      <>
        <h2 className='room-title'>Przedmioty prowadzących</h2>
        <div className='horizontal-line'></div>
        <div className='sort-container'>
          <label htmlFor='sort'>Sortuj według:</label>
          <select id='sort' value={sortBy} onChange={handleSortBy}>
            <option value=''>Brak sortowania</option>
            <option value='courseName'>Nazwa kursu</option>
            <option value='email'>E-mail</option>
          </select>
        </div>
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
            {sortedUserCoursesList.map((userCourse, index) => (
              <tr key={userCourse.id}>
                <td>{index + 1}.</td>
                <td>{userCourse.user.first_name}</td>
                <td>{userCourse.user.last_name}</td>
                <td>{userCourse.user.email}</td>
                <td>{userCourse.course.name}</td>
                <td>{generateCourseType(userCourse.course.course_type)}</td>
                <td>{userCourse.course.roomType.room_name}</td>
                <td>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleEditUserCourse(userCourse)}
                  >
                    Edytuj
                  </button>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => handleDeleteUserCourse(userCourse.id)}
                  >
                    Usuń
                  </button>
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
  };

  const generateNewUserCourseForm = () => {
    return (
      <>
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className={showForm ? 'add-form' : 'hidden'}
          >
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
                }}
              >
                <option value='no-room-type-selected'>
                  Wybierz jedną z opcji...
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.email}>
                    {user.email}
                  </option>
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
                }}
              >
                <option value='no-room-type-selected'>
                  Wybierz jedną z opcji...
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
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
                onClick={handleCancel}
              >
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
      {generateUserCoursesDisplay()}
      {generateNewUserCourseForm()}
      <ToastContainer />
    </div>
  );
}

export default UserCourses;
