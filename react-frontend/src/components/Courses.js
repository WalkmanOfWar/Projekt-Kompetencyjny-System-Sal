import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Courses() {
  const [courseList, setCourseList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState("");

  const courseTypes = [
    { value: 0, text: "Laboratorium" },
    { value: 1, text: "Wykład" },
  ];

  useEffect(() => {
    loadCourses();
    loadRoomTypes();
  }, []);

  const loadCourses = async () => {
    const result = await axios.get("http://localhost:8080/courses");
    setCourseList(result.data);
  };

  const loadRoomTypes = async () => {
    const result = await axios.get("http://localhost:8080/room_types");
    setRoomTypes(result.data);
  };

  const handleAddCourse = () => {
    setShowForm(true);
  };
  const handleCancel = () => {
    setShowForm(false);
    setCourse({
      name: "",
      course_type: 0,
      roomType: [],
    });
    setSelectedRoomType("");
  };

  useEffect(() => {
    console.log(course);
  }, [course]);

  const [course, setCourse] = useState({
    name: "",
    course_type: 0,
    roomType: [],
  });

  const { name, course_type, roomType } = course;

  const onInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const setNewRoomType = (room_name) => {
    const selectedRoomTypeObj = roomTypes.find(
      (roomType) => roomType.room_name === room_name
    );
    console.log(selectedRoomTypeObj);
    setCourse((course) => ({
      ...course,
      roomType: selectedRoomTypeObj,
    }));
  };

  const setNewCourseType = (course_id) => {
    console.log(course_id);
    setCourse((course) => ({
      ...course,
      course_type: course_id,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(course);
    await axios.post("http://localhost:8080/new_course", course);
    handleCancel();
  };

  function generateCoursesDisplay() {
    return (
      <>
        <h2 className="room-title">Lista przedmiotów</h2>
        <div className="horizontal-line"></div>
        <table className="room-table">
          <thead>
            <tr>
              <th scope="col">Lp.</th>
              <th scope="col">Nazwa przedmiotu</th>
              <th scope="col">Typ przedmiotu</th>
              <th scope="col">Typ pokoju</th>
              <th scope="col">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {courseList.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}.</td>
                <td>{course.name}</td>
                <td>{course.course_type}</td>
                <td>{course.roomType.room_name}</td>
                <td>
                  <button className="btn btn-primary mx-2">Edit</button>
                  <button className="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-button-wrapper">
          <button className="add-button" onClick={handleAddCourse}>
            Dodaj
          </button>
        </div>
      </>
    );
  }

  function generateNewCourseForm() {
    return (
      <>
        {showForm && (
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={showForm ? "add-form" : "hidden"}>
            <h2 className="text-center m-4">Nowy przedmiot</h2>
            <div className="form-group">
              <label htmlFor="Name" className="form-label">
                Nazwa:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Podaj nazwę przedmiotu"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="CourseType" className="form-label">
                Typ przedmiotu:
              </label>
              <select
                className="form-select"
                value={selectedCourseType}
                onChange={(e) => {
                  setSelectedCourseType(e.target.value);
                  setNewCourseType(e.target.value);
                }}>
                <option value="no-room-type-selected">
                  Wybierz jedną z opcji...
                </option>
                {courseTypes.map((courseType) => (
                  <option value={courseType.value}>{courseType.text}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="RoomTypeId" className="form-label">
                Typ pokoju:
              </label>
              <select
                className="form-select"
                value={selectedRoomType}
                onChange={(e) => {
                  setSelectedRoomType(e.target.value);
                  setNewRoomType(e.target.value);
                }}>
                <option value="no-room-type-selected">
                  Wybierz jedną z opcji...
                </option>
                {roomTypes.map((roomType) => (
                  <option value={roomType.value}>{roomType.room_name}</option>
                ))}
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="add-button">
                Dodaj
              </button>
              <button
                type="button"
                className="cancel-button"
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
    <div className="room-wrapper">
      {generateCoursesDisplay()}
      {generateNewCourseForm()}
    </div>
  );
}

export default Courses;
