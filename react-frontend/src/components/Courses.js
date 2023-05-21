import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Courses() {
  const [courseList, setCourseList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseType, setNewCourseType] = useState("");
  const [newRoomTypeId, setNewRoomTypeId] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [courseTypes, setCourseTypes] = useState([
    { id: 0, name: "Laboratorium" },
    { id: 1, name: "Ćwiczenia" },
    { id: 2, name: "Wykład" },
    { id: 3, name: "Projekt" },
    { id: 4, name: "Inne" },
  ]);

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
    setEditCourse(null);
    setShowForm(true);
  };

  const handleCourseNameChange = (event) => {
    setNewCourseName(event.target.value);
  };

  const handleCourseTypeChange = (event) => {
    setNewCourseType(event.target.value);
  };

  const handleRoomTypeIdChange = (event) => {
    setNewRoomTypeId(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (editCourse) {
      // If editCourse exists, it means we are editing an existing course
      const updatedCourse = {
        id: editCourse.id,
        name: newCourseName,
        course_type: newCourseType,
        roomType: { id: newRoomTypeId },
      };

      await axios.put(
        `http://localhost:8080/update_course/${editCourse.id}`,
        updatedCourse
      );

      setEditCourse(null);
      toast.success("Kurs został zaktualizowany.");
    } else {
      // Otherwise, we are adding a new course
      const newCourse = {
        name: newCourseName,
        course_type: newCourseType,
        roomType: { id: newRoomTypeId },
      };

      await axios.post("http://localhost:8080/new_course", newCourse);

      toast.success("Kurs został dodany.");
    }

    setNewCourseName("");
    setNewCourseType("");
    setNewRoomTypeId("");
    setShowForm(false);

    loadCourses();
  };

  const handleCourseDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8080/delete_course/${courseId}`);
      loadCourses();
      toast.success("Kurs został usunięty.");
    } catch (error) {
      console.log("Wystąpił błąd podczas usuwania kursu:", error);
      toast.error("Wystąpił błąd podczas usuwania .");
    }
  };

  const handleCourseEdit = (courseId) => {
    // Find the course with the given id
    const courseToEdit = courseList.find((course) => course.id === courseId);

    // Set the form values with the course data
    setEditCourse(courseToEdit);
    setNewCourseName(courseToEdit.name);
    setNewCourseType(courseToEdit.course_type);
    setNewRoomTypeId(courseToEdit.roomType.id);

    // Show the form
    setShowForm(true);
  };

  const getCourseTypeName = (courseTypeId) => {
    const courseType = courseTypes.find((type) => type.id === courseTypeId);
    return courseType ? courseType.name : "";
  };

  const getRoomTypeName = (roomTypeId) => {
    const roomType = roomTypes.find((type) => type.id === roomTypeId);
    return roomType ? roomType.room_name : "";
  };

  return (
    <div className="room-wrapper">
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
              <td>{getCourseTypeName(course.course_type)}</td>
              <td>{getRoomTypeName(course.roomType.id)}</td>
              <td>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => handleCourseEdit(course.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleCourseDelete(course.id)}
                >
                  Delete
                </button>
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
      {showForm && (
        <form onSubmit={handleFormSubmit} className="add-form">
          <div className="form-group">
            <label htmlFor="newCourseName">Nazwa przedmiotu:</label>
            <input
              type="text"
              id="newCourseName"
              value={newCourseName}
              onChange={handleCourseNameChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newCourseType">Typ przedmiotu:</label>
            <select
              id="newCourseType"
              value={newCourseType}
              onChange={handleCourseTypeChange}
            >
              <option value="">Wybierz typ przedmiotu</option>
              {courseTypes.map((courseType) => (
                <option key={courseType.id} value={courseType.id}>
                  {courseType.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="newRoomTypeId">Rodzaj sali:</label>
            <select
              id="newRoomTypeId"
              value={newRoomTypeId}
              onChange={handleRoomTypeIdChange}
            >
              <option value="">Wybierz rodzaj sali</option>
              {roomTypes.map((roomType) => (
                <option key={roomType.id} value={roomType.id}>
                  {roomType.room_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="add-button">
              {editCourse ? "Zaktualizuj" : "Dodaj"}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setEditCourse(null);
                setShowForm(false);
              }}
            >
              Anuluj
            </button>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default Courses;
