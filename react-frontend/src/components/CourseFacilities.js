import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseFacilities = () => {
  const [courseFacilities, setCourseFacilities] = useState([]);
  const [facilitiesAvailable, setFacilitiesAvailable] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [courseFacility, setCourseFacility] = useState({
    quantity: '',
    description: '',
    course: [],
    facilityAvailable: [],
  });
  const [sortBy, setSortBy] = useState('');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    loadCourseFacilities();
    loadCourses();
    loadFacilitiesAvailable();
  }, []);

  const loadCourses = async () => {
    const result = await axios.get('http://localhost:8080/courses');
    setCourses(result.data);
  };
  const loadFacilitiesAvailable = async () => {
    const result = await axios.get(
      'http://localhost:8080/facilities_available'
    );
    setFacilitiesAvailable(result.data);
  };

  const loadCourseFacilities = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/course_facilities'
      );
      setCourseFacilities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setNewCourse = (name) => {
    const selectedCourseObj = courses.find((course) => course.name === name);
    setCourseFacility((courseFacility) => ({
      ...courseFacility,
      course: selectedCourseObj,
    }));
  };

  const setNewFacility = (name) => {
    const selectedFacilityObj = facilitiesAvailable.find(
      (facility) => facility.name === name
    );
    setCourseFacility((courseFacility) => ({
      ...courseFacility,
      facilityAvailable: selectedFacilityObj,
    }));
  };

  const handleCancel = () => {
    setShowForm(false);
    setCourseFacility({
      course: [],
      facilityAvailable: [],
      quantity: '',
      description: '',
    });
    setSelectedCourse('');
    setSelectedDescription('');
    setSelectedFacility('');
    setSelectedQuantity('');
  };

  const handleAddCourseFacility = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (courseFacility.id) {
        // Edit mode: Update existing user course
        const response = await axios.put(
          `http://localhost:8080/course_facility/${courseFacility.id}`,
          courseFacility
        );
        console.log('Course facility updated:', response.data);
        toast.success('Course facility updated successfully');
      } else {
        // Add mode: Create new user course
        const response = await axios.post(
          'http://localhost:8080/new_courseFacility',
          courseFacility
        );
        console.log('Course facility created:', response.data);
        toast.success('Course facility added successfully');
      }

      handleCancel();
      loadCourseFacilities();
    } catch (error) {
      console.error('Połączenie kurs-udogodnienie już istnieje:', error);
      toast.error('Połączenie kurs-udogodnienie już istnieje');
    }
  };

  const handleEditCourseFacility = (courseFacility) => {
    setShowForm(true);
    setSelectedCourse(courseFacility.course.name);
    setSelectedFacility(courseFacility.facilityAvailable.name);
    setSelectedQuantity(courseFacility.quantity);
    setSelectedDescription(courseFacility.description);
    setCourseFacility(courseFacility);
  };

  const handleDeleteCourseFacility = async (courseFacilityId) => {
    try {
      await axios.delete(
        `http://localhost:8080/course_facility/${courseFacilityId}`
      );
      console.log('Course facility deleted');
      toast.success('Course facility deleted successfully');
      loadCourseFacilities();
    } catch (error) {
      console.error('Error deleting course facility:', error);
      toast.error('Failed to delete course facility');
    }
  };

  const generateCourseFacilitiesDisplay = () => {
    let sortedCourseFacilities = [...courseFacilities];

    if (sortBy === 'courseName') {
      sortedCourseFacilities = sortedCourseFacilities.sort((a, b) =>
        a.course.name.localeCompare(b.course.name)
      );
    } else if (sortBy === 'facilityName') {
      sortedCourseFacilities = sortedCourseFacilities.sort((a, b) =>
        a.facilityAvailable.name.localeCompare(b.facilityAvailable.name)
      );
    }
    return (
      <>
        <h2 className='room-title'>Udogodnienia kursów</h2>
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
            <option value='courseName'>Nazwa kursu</option>
            <option value='facilityName'>Nazwa udogodnienia</option>
          </select>
        </div>
        <table className='room-table'>
          <thead>
            <tr>
              <th scope='col'>Lp.</th>
              <th scope='col'>Nazwa kursu</th>
              <th scope='col'>Nazwa udogodnienia</th>
              <th scope='col'>Ilość</th>
              <th scope='col'>Opis</th>
              <th scope='col'>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {sortedCourseFacilities.map((courseFacility, index) => (
              <tr key={courseFacility.id}>
                <td>{index + 1}.</td>
                <td>{courseFacility.course.name}</td>
                <td>{courseFacility.facilityAvailable.name}</td>
                <td>{courseFacility.quantity}</td>
                <td>
                  {courseFacility.description === ''
                    ? 'Brak opisu'
                    : courseFacility.description}
                </td>
                <td>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleEditCourseFacility(courseFacility)}>
                    Edytuj
                  </button>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() =>
                      handleDeleteCourseFacility(courseFacility.id)
                    }>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='add-button-wrapper'>
          <button className='add-button' onClick={handleAddCourseFacility}>
            Dodaj
          </button>
        </div>
      </>
    );
  };

  const generateNewCourseFacilityForm = () => {
    return (
      <>
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className={showForm ? 'add-form' : 'hidden'}>
            <h2 className='text-center m-4'>
              Nowe połączenie kurs-udogodnienie
            </h2>

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
                required>
                <option value=''>Wybierz jedną z opcji...</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='Facility' className='form-label'>
                Udogodnienie:
              </label>
              <select
                className='form-select'
                value={selectedFacility}
                onChange={(e) => {
                  setSelectedFacility(e.target.value);
                  setNewFacility(e.target.value);
                }}
                required>
                <option value=''>Wybierz jedną z opcji...</option>
                {facilitiesAvailable.map((facility) => (
                  <option key={facility.id} value={facility.name}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='Quantity' className='form-label'>
                Ilość:
              </label>
              <input
                className='form-control'
                type='number'
                min={0}
                value={selectedQuantity}
                onChange={(e) => {
                  setSelectedQuantity(e.target.value);
                  setCourseFacility((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Description' className='form-label'>
                Opis:
              </label>
              <input
                className='form-control'
                type='text'
                value={selectedDescription}
                onChange={(e) => {
                  setSelectedDescription(e.target.value);
                  setCourseFacility((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
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
  };

  return (
    <div className='room-wrapper'>
      {generateCourseFacilitiesDisplay()}
      {generateNewCourseFacilityForm()}
      <ToastContainer />
    </div>
  );
};

export default CourseFacilities;
