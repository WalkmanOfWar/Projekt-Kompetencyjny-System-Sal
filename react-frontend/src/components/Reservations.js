import React, { useState } from "react";
import "./Room.css";

function Reservations() {
  const [reservationList, setReservationList] = useState([{ id: 1, name: "10" }]);
  const [showForm, setShowForm] = useState(false);
  const [newClassScheduleId, setNewClassScheduleId] = useState("");
  const [newStatus, setNewStatus] = useState("");
 

  const handleAddReservation= () => {
    setShowForm(true);
  };

  const handleClassScheduleIdChange = (event) => {
    setNewClassScheduleId(event.target.value);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };
 


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newReservationId = reservationList.length + 1;
    setReservationList([...reservationList, { id: newReservationId, name: newClassScheduleId }]);
    setNewClassScheduleId("");
    setNewStatus("");
    setShowForm(false);
  };
  
  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista Rezerwacji</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Id planu zajęć</th>
          </tr>
        </thead>
        <tbody>
          {reservationList.map((reservation, index) => (
            <tr key={reservation.id}>
              <td>{index + 1}.</td>
              <td>{reservation.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-button-wrapper">
        <button className="add-button" onClick={handleAddReservation}>
          Dodaj
        </button>
      
      </div>
      {showForm && (
  <form onSubmit={handleFormSubmit} className={showForm ? "add-form" : "hidden"}>
    <div className="form-group">
      <label htmlFor="newClassScheduleId">Id planu zajęć:</label>
      <input
       type="number"
       step="1"
        id="newClassScheduleId"
        value={newClassScheduleId}
        onChange={handleClassScheduleIdChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newStatus">Status:</label>
      <input
         type="number"
         step="1"
        id="newStatus"
        value={newStatus}
        onChange={handleStatusChange}
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
    setNewClassScheduleId("");
    setNewStatus("");
    setShowForm(false);
}

}

export default Reservations;
