import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Courses() {
  const [courseList, setCourseList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseType, setNewCourseType] = useState("");
  const [newFacilitiesId, setNewFacilitiesId] = useState("");
  const [newRoomTypesId, setNewRoomTypesId] = useState("");

  useEffect(() => {
    loadCourses()
  }, []);

  const loadCourses = async () => {
      const result = await axios.get("http://localhost:8080/courses");
      setCourseList(result.data)
  }


  const handleAddCourse = () => {
    setShowForm(true);
  };

  const handleCourseNameChange = (event) => {
    setNewCourseName(event.target.value);
  };

  const handleCourseTypeChange = (event) => {
    setNewCourseType(event.target.value);
  };
  const handleFacilitiesIdChange = (event) => {
    setNewFacilitiesId(event.target.value);
  };
  const handleRoomTypesIdChange = (event) => {
    setNewRoomTypesId(event.target.value);
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newCourseId = courseList.length + 1;
    setCourseList([...courseList, { id: newCourseId, name: newCourseName }]);
    setNewCourseName("");
    setNewCourseType("");
    setNewFacilitiesId("");
    setNewRoomTypesId("");
    setShowForm(false);
  };
  
  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista przedmiotów</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Nazwa przedmiotu</th>
            <th>Typ przedmiotu</th>
            <th>Typ pokoju</th>
          </tr>
        </thead>
        <tbody>
          {courseList.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}.</td>
              <td>{course.name}</td>
              <td>{course.course_type}</td>
              <td>{course.roomType.room_name}</td>
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
  <form onSubmit={handleFormSubmit} className={showForm ? "add-form" : "hidden"}>
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
      <input
        type="number"
        step="1"
        id="newCourseType"
        value={newCourseType}
        onChange={handleCourseTypeChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newFacilitiesId">Id rodzaju udogodnień:</label>
      <input
        type="number"
        step="1"
        id="newFacilitiesId"
        value={newFacilitiesId}
        onChange={handleFacilitiesIdChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newRoomTypesId">Id rodzaju sali:</label>
      <input
        type="number"
        step="1"
        id="newRoomTypesId"
        value={newRoomTypesId}
        onChange={handleRoomTypesIdChange}
      />
    </div>

    <div className="form-buttons">
    <button type="submit" className="add-button">Dodaj</button>
<button type="button" className="cancel-button" onClick={handleCancel}>
  Anuluj
</button>

    </div>
  </form>
      )}
    </div>
  );

function handleCancel() {
    setShowForm(false);
    setNewCourseName("");
    setNewCourseType("");
    setNewFacilitiesId("");
    setNewRoomTypesId("");
}

}

export default Courses;
