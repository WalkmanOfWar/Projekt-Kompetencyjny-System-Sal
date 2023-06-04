import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Room() {
  const [roomList, setRoomList] = useState([]);
  const [facilitiesAvailable, setFacilitiesAvailable] = useState([]); // Nowy stan dla dostępnych udogodnień
  const [showForm, setShowForm] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");
  const [newRoomTypeId, setNewRoomTypeId] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [editRoomId, setEditRoomId] = useState(null); // Nowy stan przechowujący ID edytowanej sali
  const [sortBy, setSortBy] = useState("");
  const [searchFacilities, setSearchFacilities] = useState([]); // Nowy stan dla udogodnień
  const [minQuantities, setMinQuantities] = useState([]); // Nowy stan dla minimalnej liczby
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    loadRooms();
    loadRoomTypes();
    loadFacilitiesAvailable(); // Dodaj ładowanie dostępnych udogodnień
  }, [searchFacilities, minQuantities]); // Dodaj nowe zmienne stanu do listy zależności

  const loadFacilitiesAvailable = async () => {
    const result = await axios.get(
      "http://localhost:8080/facilities_available"
    );
    setFacilitiesAvailable(result.data);
  };
  const handleRemoveFacility = (indexToRemove) => {
    setSearchFacilities(
      searchFacilities.filter((_, index) => index !== indexToRemove)
    );
    setMinQuantities(
      minQuantities.filter((_, index) => index !== indexToRemove)
    );
  };

  const loadRooms = async () => {
    const facilitiesString = searchFacilities.join(",");
    const quantitiesString = minQuantities.join(",");
    console.log(facilitiesString);
    console.log(quantitiesString);
    const result = await axios.get(
      `http://localhost:8080/rooms/search?facilities=${facilitiesString}&minQuantities=${quantitiesString}`
    );
    setRoomList(result.data);
  };

  const loadRoomTypes = async () => {
    const result = await axios.get("http://localhost:8080/room_types");
    setRoomTypes(result.data);
  };

  // Przykładowe obsługiwanie wielu pól wejściowych dla udogodnień i ilości
  const handleAddFacility = () => {
    setSearchFacilities([...searchFacilities, ""]);
    setMinQuantities([...minQuantities, 0]);
  };

  const handleFacilityChange = (index, event) => {
    const newFacilities = [...searchFacilities];
    newFacilities[index] = event.target.value;
    setSearchFacilities(newFacilities);
  };

  const handleQuantityChange = (index, event) => {
    const newQuantities = [...minQuantities];
    newQuantities[index] = event.target.value;
    setMinQuantities(newQuantities);
  };

  const handleAddRoom = () => {
    setShowForm(true);
  };

  const handleEditRoom = (roomId) => {
    setEditRoomId(roomId);
    const room = roomList.find((room) => room.id === roomId);
    setNewRoomName(room.name);
    setNewRoomDescription(room.description);
    setNewRoomTypeId(room.roomType.id);
    setShowForm(true);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:8080/rooms/${roomId}`);
      toast.success("Sala została usunięta.");
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Wystąpił błąd podczas usuwania sali.");
    }
    loadRooms();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newRoom = {
      name: newRoomName,
      description: newRoomDescription,
      roomType: { id: newRoomTypeId, room_name: "" },
    };

    if (editRoomId) {
      // Edycja istniejącej sali
      try {
        await axios.put(`http://localhost:8080/rooms/${editRoomId}`, newRoom);
        toast.success("Sala została zaktualizowana.");
      } catch (error) {
        console.error("Error updating room:", error);
        toast.error("Wystąpił błąd podczas aktualizacji sali.");
      }
    } else {
      // Dodawanie nowej sali
      try {
        await axios.post("http://localhost:8080/rooms", newRoom);
        toast.success("Sala została dodana.");
      } catch (error) {
        console.error("Error adding room:", error);
        toast.error("Wystąpił błąd podczas dodawania sali.");
      }
    }
    handleCancel();
    loadRooms();
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewRoomName("");
    setNewRoomDescription("");
    setNewRoomTypeId("");
    setEditRoomId(null);
  };

  const generateRoomsDisplay = () => {
    let sortedRooms = [...roomList];

    if (sortBy === "roomName") {
      sortedRooms = sortedRooms.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "roomType") {
      sortedRooms = sortedRooms.sort((a, b) =>
        a.roomType.room_name.localeCompare(b.roomType.room_name)
      );
    }
    return (
      <>
        <h2 className="room-title">Lista sal</h2>
        <div className="search-container">
          {searchFacilities.map((facility, index) => (
            <div key={index} className="facility-container">
              <div className="facility-inputs">
                <select
                  className="form-select d-i"
                  value={facility}
                  onChange={(e) => handleFacilityChange(index, e)}
                >
                  <option value="">Wybierz udogodnienie</option>
                  {facilitiesAvailable.map((facilityAvailable, i) => (
                    <option key={i} value={facilityAvailable.name}>
                      {facilityAvailable.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="search-input form-control"
                  placeholder="Podaj minimalną liczbę"
                  value={minQuantities[index]}
                  onChange={(e) => handleQuantityChange(index, e)}
                  min={0}
                />
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveFacility(index)}
              >
                -
              </button>
            </div>
          ))}
          <div className="add-facility-button-container">
            <button className="btn btn-primary" onClick={handleAddFacility}>
              Dodaj udogodnienie
            </button>
          </div>
        </div>

        <div className="horizontal-line"></div>
        <div className="sort-container">
          <h4 htmlFor="sort" className="label text-light">
            Sortuj według:
          </h4>
          <select
            className="form-select"
            id="sort"
            value={sortBy}
            onChange={handleSortBy}
          >
            <option value="">Brak sortowania</option>
            <option value="roomName">Nazwa pokoju</option>
            <option value="roomType">Typ pokoju</option>
          </select>
        </div>
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
            {sortedRooms.map((room, index) => (
              <tr key={room.id}>
                <td>{index + 1}.</td>
                <td>{room.name}</td>
                <td>
                  {room.description === "" ? "Brak opisu" : room.description}
                </td>
                <td>{room.roomType.room_name}</td>
                <td>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => handleEditRoom(room.id)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    Usuń
                  </button>
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
          <form
            onSubmit={handleFormSubmit}
            className={showForm ? "add-form" : "hidden"}
          >
            <h2 className="text-center m-4">
              {editRoomId ? "Edytuj salę" : "Nowa sala"}
            </h2>
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
                required
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
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="roomType" className="form-label">
                Rodzaj sali:
              </label>
              <select
                className="form-select"
                name="roomType"
                value={newRoomTypeId}
                onChange={(e) => setNewRoomTypeId(e.target.value)}
                required
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
                {editRoomId ? "Zapisz" : "Dodaj"}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Anuluj
              </button>
            </div>
          </form>
        )}
      </>
    );
  };

  return (
    <div className="room-wrapper">
      {generateRoomsDisplay()}
      <ToastContainer />
    </div>
  );
}

export default Room;
