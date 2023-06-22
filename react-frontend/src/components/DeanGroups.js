import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeanGroups() {
  const [deanGroups, setDeanGroups] = useState([]);
  const [deanGroupCourses, setdeanGroupCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourses, setNewCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreDeanGroupId, setViewMoreDeanGroupId] = useState(null);
  const [editDeanGroup, setEditDeanGroup] = useState(null);
  const [newDeanGroupName, setNewDeanGroupName] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [sortBy, setSortBy] = useState('');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    loadDeanGroups();
    loadCourses();
  }, []);

  const loadDeanGroups = async () => {
    const result = await axios.get('http://localhost:8080/dean-groups');
    setDeanGroups(result.data);
  };

  const loadCourses = async () => {
    const result = await axios.get('http://localhost:8080/courses');
    setCourses(result.data);
  };

  const handleAddDeanGroup = () => {
    setEditDeanGroup(null);
    setShowForm(true);
  };

  const handleDeanGroupNameChange = (event) => {
    setNewDeanGroupName(event.target.value);
  };

  const handleNewCourseChange = (event) => {
    setNewCourse(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editDeanGroup) {
        const updatedDeanGroup = {
          id: editDeanGroup.id,
          name: newDeanGroupName,
        };

        await axios.put(
          `http://localhost:8080/update_dean-group/${editDeanGroup.id}`,
          updatedDeanGroup
        );

        setEditDeanGroup(null);
        toast.success('Grupa dziekańska została zaktualizowana.');
      } else {
        // Otherwise, we are adding a new dean group
        const deanGroup = {
          name: newDeanGroupName,
        };

        await axios.post('http://localhost:8080/new_dean-group', deanGroup);

        toast.success('Kurs został dodany.');
      }

      setNewDeanGroupName('');
      setShowForm(false);

      loadDeanGroups();
    } catch (error) {
      console.log(error);
      toast.error('Coś poszło nie tak');
    }
  };

  const handleAddDeanGroupCourse = async (e) => {
    e.preventDefault();
    try {
      const foundCourse = newCourses.find(
        (course) => course.name === newCourse
      );
      await axios.put(
        `http://localhost:8080/dean_groups/${viewMoreDeanGroupId}/new-course/${foundCourse.id}`
      );
      toast.success('Nowy kurs dodany');
      loadDeanGroups();
    } catch (error) {
      console.log(error);
      toast.error('Nie udało sie dodać nowego kursu');
    }

    setViewMore(true);
    setShowAddCourseForm(false);
  };

  const handleDeanGroupDelete = async (deanGroupId) => {
    try {
      console.log(deanGroupId);
      await axios.delete(`http://localhost:8080/dean_groups/${deanGroupId}`);
      loadDeanGroups();
      toast.success('Kurs został usunięty.');
    } catch (error) {
      console.log('Wystąpił błąd podczas usuwania grupy dziekańskiej:', error);
      toast.error('Wystąpił błąd podczas usuwania .');
    }
  };

  const handleDeanGroupCourseDelete = async (
    deanGroupId,
    deanGroupCourseId
  ) => {
    try {
      console.log(deanGroupId);
      console.log(deanGroupCourseId);
      await axios.put(
        `http://localhost:8080/dean-groups/${deanGroupId}/courses/${deanGroupCourseId}`
      );
      setdeanGroupCourses(
        deanGroupCourses.filter((course) => course.id !== deanGroupCourseId)
      );
      toast.success('Kurs grupy dziekańskiej został usunięty');
    } catch (error) {
      console.log('Wystąpił błąd podczas usuwania kursu grupy dziekańskiej');
      toast.error('Wystąpił błąd podczas usuwania kursu grupy dziekańskiej');
    }
  };

  const handleShowMoreDeanGroup = async (deanGroupId) => {
    const deanGroup = deanGroups.find(
      (deanGroup) => deanGroup.id === deanGroupId
    );
    const deanCourses = deanGroup.courses;
    console.log(courses);
    console.log(deanCourses);
    const filteredCourses = courses.filter(
      (course) => !deanCourses.some((deanCourse) => deanCourse.id === course.id)
    );
    setNewCourses(filteredCourses);
    setdeanGroupCourses(deanGroup.courses);
    setViewMoreDeanGroupId(deanGroup.id);
    setViewMore(true);
  };
  const handleDeanGroupEdit = (deanGroupId) => {
    // Find the course with the given id
    const deanGroupToEdit = deanGroups.find(
      (deanGroup) => deanGroup.id === deanGroupId
    );

    // Set the form values with the course data
    setEditDeanGroup(deanGroupToEdit);
    setNewDeanGroupName(deanGroupToEdit.name);

    // Show the form
    setShowForm(true);
  };

  const generateDeanGroupsDisplay = () => {
    let sortedDeanGroups = [...deanGroups];

    if (sortBy === 'name') {
      sortedDeanGroups = sortedDeanGroups.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    return (
      <>
        <h2 className='room-title'>Lista grup dziekańskich</h2>
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
            <option value='name'>Nazwa grupy dziekańskiej</option>
          </select>
        </div>
        <table className='room-table'>
          <thead>
            <tr>
              <th scope='col'>Lp.</th>
              <th scope='col'>Nazwa grupy dziekańskiej</th>
              <th scope='col'>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {sortedDeanGroups.map((deanGroup, index) => (
              <tr key={deanGroup.id}>
                <td>{index + 1}.</td>
                <td>{deanGroup.name}</td>
                <td>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleShowMoreDeanGroup(deanGroup.id)}>
                    Zobacz więcej
                  </button>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleDeanGroupEdit(deanGroup.id)}>
                    Edytuj
                  </button>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => handleDeanGroupDelete(deanGroup.id)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='add-button-wrapper'>
          <button className='add-button' onClick={handleAddDeanGroup}>
            Dodaj
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleFormSubmit} className='add-form'>
            <div className='form-group'>
              <label htmlFor='newDeanGroupName'>
                Nazwa grupy dziekańskiej:
              </label>
              <input
                type='text'
                id='newDeanGroupName'
                value={newDeanGroupName}
                onChange={handleDeanGroupNameChange}
                required
              />
            </div>

            <div className='form-buttons'>
              <button type='submit' className='add-button'>
                {editDeanGroup ? 'Zaktualizuj' : 'Dodaj'}
              </button>
              <button
                type='button'
                className='cancel-button'
                onClick={() => {
                  setEditDeanGroup(null);
                  setShowForm(false);
                }}>
                Anuluj
              </button>
            </div>
          </form>
        )}

        {showAddCourseForm && (
          <form onSubmit={handleAddDeanGroupCourse} className='add-form'>
            <h2 className='text-center m-4'>Nowy kurs</h2>

            <div className='form-group'>
              <label htmlFor='User' className='form-label'>
                Kurs:
              </label>
              <select
                className='form-select'
                value={newCourse}
                onChange={handleNewCourseChange}
                required>
                <option value=''>Wybierz jedną z opcji...</option>
                {newCourses.map((course) => (
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
                onClick={() => {
                  setViewMore(true);
                  setShowAddCourseForm(false);
                }}>
                Anuluj
              </button>
            </div>
          </form>
        )}

        {viewMore && (
          <div onSubmit={handleFormSubmit} className='add-form'>
            <div className='form-group'>
              <table className='room-table'>
                <thead>
                  <tr>
                    <th scope='col'>Lp.</th>
                    <th scope='col'>Nazwa kursu</th>
                    <th scope='col'>Akcja</th>
                  </tr>
                </thead>
                <tbody>
                  {deanGroupCourses.map((deanGroup, index) => (
                    <tr key={deanGroup.id}>
                      <td>{index + 1}.</td>
                      <td>{deanGroup.name}</td>
                      <td>
                        <button
                          className='btn btn-danger mx-2'
                          onClick={() =>
                            handleDeanGroupCourseDelete(
                              viewMoreDeanGroupId,
                              deanGroup.id
                            )
                          }>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='form-buttons'>
                <button
                  type='button'
                  className='cancel-button'
                  onClick={() => {
                    setViewMore(false);
                  }}>
                  Anuluj
                </button>
                <button
                  type='button'
                  className='add-button'
                  onClick={() => {
                    setViewMore(false);
                    setShowAddCourseForm(true);
                  }}>
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className='room-wrapper'>
      {generateDeanGroupsDisplay()}
      <ToastContainer />
    </div>
  );
}

export default DeanGroups;
