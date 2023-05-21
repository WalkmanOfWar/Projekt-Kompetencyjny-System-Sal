import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomTypes() {
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoomTypeName, setNewRoomTypeName] = useState("");

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    const result = await axios.get("http://localhost:8080/room_types");
    setRoomTypeList(result.data);
  };

  const handleAddRoomType = () => {
    setShowForm(true);
  };

  const handleRoomTypeNameChange = (event) => {
    setNewRoomTypeName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newRoomType = { room_name: newRoomTypeName };
    try {
      const response = await axios.post("http://localhost:8080/new_roomType", newRoomType);
      const createdRoomType = response.data;
      setRoomTypeList([...roomTypeList, createdRoomType]);
      setNewRoomTypeName("");
      setShowForm(false);
    } catch (error) {
      console.error("Error creating room type:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewRoomTypeName("");
  };

  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista typów sal</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th scope="col">Lp.</th>
            <th scope="col">Nazwa</th>
            <th scope="col">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {roomTypeList.map((roomType, index) => (
            <tr key={roomType.id}>
              <td>{index + 1}.</td>
              <td>{roomType.room_name}</td>
              <td>
                <button className="btn btn-primary mx-2">Edit</button>
                <button className="btn btn-danger mx-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-button-wrapper">
        <button className="add-button" onClick={handleAddRoomType}>
          Dodaj
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className={showForm ? "add-form" : "hidden"}>
          <div className="form-group">
            <label htmlFor="newRoomTypeName">Nazwa typu sali:</label>
            <input
              type="text"
              id="newRoomName"
              value={newRoomTypeName}
              onChange={handleRoomTypeNameChange}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="add-button">
              Dodaj
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Anuluj
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RoomTypes;
