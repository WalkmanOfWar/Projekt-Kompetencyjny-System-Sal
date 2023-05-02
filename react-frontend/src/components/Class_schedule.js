
import React, { useState } from "react";
import "./Room.css";

function Class_schedule() {
  const [classScheduleList, setClassScheduleList] = useState([{ id: 1, name: "10" }]);
  const [showForm, setShowForm] = useState(false);
  const [newTimeDateId, setNewTimeDateId,] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newRoomId, setNewRoomId] = useState("");
  const [newDayOfWeek, setNewDayOfWeek] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const [newStartWeek, setNewStartWeek] = useState("");
  const [newEndWeek, setNewEndWeek] = useState("");
  const [newIsParity, setNewIsParity] = useState("");


  const handleAddClassSchedule = () => {
    setShowForm(true);
  };

  const handleTimeDateIdChange = (event) => {
    setNewTimeDateId(event.target.value);
  };

  const handleCourseIdChange = (event) => {
    setNewCourseId(event.target.value);
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



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newClassScheduleId = classScheduleList.length + 1;
    setClassScheduleList([...classScheduleList, { id: newClassScheduleId, name: newTimeDateId }]);
    setNewTimeDateId("");
    setNewCourseId("");
    setNewRoomId("");
    setNewDayOfWeek("");
    setNewStartTime("");
    setNewEndTime("");
    setNewStartWeek("");
    setNewEndWeek("");
    document.getElementById("newIsParity").checked = false;

    setShowForm(false);
    
  };
  
  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista planów zajęć</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Id czasu</th>
          </tr>
        </thead>
        <tbody>
          {classScheduleList.map((classSchedule, index) => (
            <tr key={classSchedule.id}>
              <td>{index + 1}.</td>
              <td>{classSchedule.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-button-wrapper">
        <button className="add-button" onClick={handleAddClassSchedule}>
          Dodaj
        </button>
      
      </div>
      {showForm && (
  <form onSubmit={handleFormSubmit} className={showForm ? "add-form" : "hidden"}>



<div className="form-group">
      <label htmlFor="newTimeDateId">Id Czasu:</label>
      <input
        type="number"
        step="1"
        id="newTimeDateId"
        value={newTimeDateId}
        onChange={handleTimeDateIdChange}
      />
    </div>






<div className="form-group">
      <label htmlFor="newCourseId">Id Przedmiotu:</label>
      <input
        type="number"
        step="1"
        id="newCourseId"
        value={newCourseId}
        onChange={handleCourseIdChange}
      />
    </div>





<div className="form-group">
      <label htmlFor="newCourseId">Id Przedmiotu:</label>
      <input
        type="number"
        step="1"
        id="newCourseId"
        value={newCourseId}
        onChange={handleCourseIdChange}
      />
    </div>






<div className="form-group">
      <label htmlFor="newRoomId">Id sali:</label>
      <input
        type="number"
        step="1"
        id="newRoomId"
        value={newRoomId}
        onChange={handleRoomIdChange}
      />
    </div>





<div className="form-group">
      <label htmlFor="newDayOfWeek">Dzień tygodnia:</label>
      <input
        type="number"
        step="1"
        id="newDayOfWeek"
        value={newDayOfWeek}
        onChange={handleDayOfWeekChange}
      />
    </div>


    <div className="form-group">
      <label htmlFor="newStartTime">Czas Rozpoczęcia:</label>
      <input
        type="time"
        id="newStartTime"
        value={newStartTime}
        onChange={handleStartTimeChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="newEndTime">Czas Zakończenia:</label>
      <input
        type="time"
        id="newEndTime"
        value={newEndTime}
        onChange={handleEndTimeChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="newStartWeek">Początkowy tydzień:</label>
      <input
        type="number"
        step="1"
        id="newStartWeek"
        value={newStartWeek}
        onChange={handleStartWeekChange}
      />
    </div>


    <div className="form-group">
      <label htmlFor="newEndWeek">Końcowy tydzień:</label>
      <input
        type="number"
        step="1"
        id="newEndWeek"
        value={newEndWeek}
        onChange={handleEndWeekChange}
      />
    </div>



 
    <div className="form-group">
      <label htmlFor="newIsParity">Parzystość:</label>
      <input
        type="checkbox"
        id="newIsParity"
        value={newIsParity}
        onChange={handleIsParityChange}
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
  setNewTimeDateId("");
  setNewCourseId("");
  setNewRoomId("");
  setNewDayOfWeek("");
  setNewStartTime("");
  setNewEndTime("");
  setNewStartWeek("");
  setNewEndWeek("");
  document.getElementById("newIsParity").checked = false;
  setShowForm(false);
  
}

}

export default Class_schedule;
