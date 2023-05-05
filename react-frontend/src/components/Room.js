import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Room() {
  const [roomList, setRoomList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomFacilityId, setNewRoomFacilityId] = useState("");
  const [newRoomTypeId, setNewRoomTypeId] = useState("");

  useEffect(() => {
    loadRooms()
  }, []);

  const loadRooms = async () => {
      const result = await axios.get("http://localhost:8080/rooms");
      setRoomList(result.data)
  }


  const handleAddRoom = () => {
    setShowForm(true);
  };

  const handleRoomNameChange = (event) => {
    setNewRoomName(event.target.value);
  };

  const handleRoomDescriptionChange = (event) => {
    setNewRoomDescription(event.target.value);
  };
  const handleRoomFacilityIdChange = (event) => {
    setNewRoomFacilityId(event.target.value);
  };
  const handleRoomTypeIdChange = (event) => {
    setNewRoomTypeId(event.target.value);
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newRoomId = roomList.length + 1;
    setRoomList([...roomList, { id: newRoomId, name: newRoomName }]);
    setNewRoomName("");
    setNewRoomDescription("");
    setNewRoomFacilityId("");
    setNewRoomTypeId("");
    setShowForm(false);
  };
  
  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista sal</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Nazwa sali</th>
            <th>Rodzaj sali</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}.</td>
              <td>{room.name}</td>
              <td>{room.roomType.room_name}</td>
              <td>{room.description === "" ? "Brak opisu" : room.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-button-wrapper">
        <button className="add-button" onClick={handleAddRoom}>
          Dodaj
        </button>
      
      </div>
      {showForm && (
  <form onSubmit={handleFormSubmit} className={showForm ? "add-form" : "hidden"}>
    <div className="form-group">
      <label htmlFor="newRoomName">Nazwa sali:</label>
      <input
        type="text"
        id="newRoomName"
        value={newRoomName}
        onChange={handleRoomNameChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newRoomDescription">Opis:</label>
      <input
        type="text"
        id="newRoomDescription"
        value={newRoomDescription}
        onChange={handleRoomDescriptionChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newRoomFacilityId">Id Udogodnień:</label>
      <input
        type="number"
        step="1"
        id="newRoomFacilityId"
        value={newRoomFacilityId}
        onChange={handleRoomFacilityIdChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newRoomTypeId">Id rodzaju sali:</label>
      <input
        type="number"
        step="1"
        id="newRoomTypeId"
        value={newRoomTypeId}
        onChange={handleRoomTypeIdChange}
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
  setNewRoomName("");
  setNewRoomDescription("");
  setNewRoomFacilityId("");
  setNewRoomTypeId("");
}

}

export default Room;
