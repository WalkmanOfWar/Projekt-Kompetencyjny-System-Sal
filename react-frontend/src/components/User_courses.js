import React, { useState } from "react";
import "./Room.css";

function User_courses() {
  const [userCoursesList, setUserCoursesList] = useState([{ id: 1, name: "0" }]);
  const [showForm, setShowForm] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newCourseId, setNewCourseId] = useState("");



  const handleAddUserCourses = () => {
    setShowForm(true);
  };

  const handleUserIdChange = (event) => {
    setNewUserId(event.target.value);
  };
  const handleCourseIdChange = (event) => {
    setNewCourseId(event.target.value);
  };
 


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newUserCoursesId = userCoursesList.length + 1;
    setUserCoursesList([...userCoursesList, { id: newUserCoursesId, name: newUserId }]);
    setNewUserId("");
   
    setShowForm(false);
  };
  
  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista Przedmiotów prowadząćych</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Id prowadzącego</th>
          </tr>
        </thead>
        <tbody>
          {userCoursesList.map((userCourse, index) => (
            <tr key={userCourse.id}>
              <td>{index + 1}.</td>
              <td>{userCourse.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-button-wrapper">
        <button className="add-button" onClick={handleAddUserCourses}>
          Dodaj
        </button>
      
      </div>
      {showForm && (
  <form onSubmit={handleFormSubmit} className={showForm ? "add-form" : "hidden"}>
    <div className="form-group">
      <label htmlFor="newUserId">Id prowadzącego:</label>
      <input
        type="number"
        step="1"
        id="newUserId"
        value={newUserId}
        onChange={handleUserIdChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="newCourseId">Id przedmiotu:</label>
      <input
        type="number"
        step="1"
        id="newCourseId"
        value={newCourseId}
        onChange={handleCourseIdChange}
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
  setNewUserId("");
  setNewCourseId("");

}

}

export default User_courses;
