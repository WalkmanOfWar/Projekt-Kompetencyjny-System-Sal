import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Room_types() {
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoomTypeName, setNewRoomTypeName] = useState("");

  useEffect(() => {
    loadRoomTypes()
  }, []);

  const loadRoomTypes = async () => {
      const result = await axios.get("http://localhost:8080/room_types");
      setRoomTypeList(result.data)
  }


  const handleAddRoomType = () => {
    setShowForm(true);
  };

  const handleRoomTypeNameChange = (event) => {
    setNewRoomTypeName(event.target.value);
  };

 


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newRoomTypeId = roomTypeList.length + 1;
    setRoomTypeList([...roomTypeList, { id: newRoomTypeId, name: newRoomTypeName }]);
    setNewRoomTypeName("");
   
    setShowForm(false);
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
                <button className="btn btn-primary mx-2">
                  Edit
                </button>
                <button className="btn btn-danger mx-2">
                  Delete
                </button>
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
  setNewRoomTypeName("");
 
}

}

export default Room_types;
