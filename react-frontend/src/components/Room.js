import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Room() {
  const [roomList, setRoomList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");

  useEffect(() => {
    loadRooms();
    loadRoomTypes();
  }, []);

  const loadRooms = async () => {
    const result = await axios.get("http://localhost:8080/rooms");
    setRoomList(result.data);
  };

  const loadRoomTypes = async () => {
    const result = await axios.get("http://localhost:8080/room_types");
    setRoomTypes(result.data);
  };

  const handleAddRoom = () => {
    setShowForm(true);
  };
  const handleCancel = () => {
    setShowForm(false);
    setRoom({
      name: "",
      description: "",
      roomType: [],
    });
    setSelectedRoomType("");
  };

  const [room, setRoom] = useState({
    name: "",
    description: "",
    roomType: [],
  });

  const { name, description, roomType } = room;

  const onInputChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(room);
  }, [room]);

  const setNewRoomType = (room_name) => {
    const selectedRoomTypeObj = roomTypes.find(
      (roomType) => roomType.room_name === room_name
    );
    setRoom((room) => ({
      ...room,
      roomType: selectedRoomTypeObj,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/new_room", room);
    handleCancel();
  };

  function generateRoomsDisplay() {
    return (
      <>
        <h2 className="room-title">Lista sal</h2>
        <div className="horizontal-line"></div>
        <table className="room-table">
          <thead>
            <tr>
              <th scope="col">Lp.</th>
              <th scope="col">Nazwa sali</th>
              <th scope="col">Rodzaj sali</th>
              <th scope="col">Opis</th>
              <th scope="col">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {roomList.map((room, index) => (
              <tr key={room.id}>
                <td>{index + 1}.</td>
                <td>{room.name}</td>
                <td>{room.roomType.room_name}</td>
                <td>
                  {room.description === "" ? "Brak opisu" : room.description}
                </td>
                <td>
                  <button className="btn btn-primary mx-2">Edit</button>
                  <button className="btn btn-danger mx-2">Delete</button>
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
      </>
    );
  }

  function generateNewRoomForm() {
    return (
      <>
        {showForm && (
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={showForm ? "add-form" : "hidden"}>
            <h2 className="text-center m-4">Nowa sala</h2>
            <div className="form-group">
              <label htmlFor="Name" className="form-label">
                Nazwa:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Podaj nazwę pokoju"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Description" className="form-label">
                Opis:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Podaj opis"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
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
      {generateRoomsDisplay()}
      {generateNewRoomForm()}
    </div>
  );
}

export default Room;
