import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Room() {
  const [roomList, setRoomList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomTypeId, setNewRoomTypeId] = useState("");

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const result = await axios.get("http://localhost:8080/rooms");
    setRoomList(result.data);
  };

  const handleAddRoom = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newRoom = {
      name: newRoomName,
      description: newRoomDescription,
      roomType: { id: newRoomTypeId, room_name: "" },
    };

    await axios.post("http://localhost:8080/new_room", newRoom);
    handleCancel();
    loadRooms();
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewRoomName("");
    setNewRoomDescription("");
    setNewRoomTypeId("");
  };

  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista sal</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th scope="col">Lp.</th>
            <th scope="col">Nazwa</th>
            <th scope="col">Opis</th>
            <th scope="col">Rodzaj sali</th>
            <th scope="col">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}.</td>
              <td>{room.name}</td>
              <td>{room.description}</td>
              <td>{room.roomType.room_name}</td>
              <td>
                <button className="btn btn-primary mx-2">Edytuj</button>
                <button className="btn btn-danger mx-2">Usuń</button>
              </td>
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
          <h2 className="text-center m-4">Nowa sala</h2>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nazwa:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Podaj nazwę"
              name="name"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Opis:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Podaj opis"
              name="description"
              value={newRoomDescription}
              onChange={(e) => setNewRoomDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roomType" className="form-label">
              Rodzaj sali:
            </label>
            <select
              className="form-control"
              name="roomType"
              value={newRoomTypeId}
              onChange={(e) => setNewRoomTypeId(e.target.value)}
            >
              <option value="">Wybierz rodzaj sali</option>
              <option value="6">Aula</option>
              <option value="5">Sala wykładowa</option>
              <option value="4">Laboratorium</option>
            </select>
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

export default Room;
