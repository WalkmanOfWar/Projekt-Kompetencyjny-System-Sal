import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomFacilities = () => {
  const [roomFacilities, setRoomFacilities] = useState([]);
  const [facilitiesAvailable, setFacilitiesAvailable] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [roomFacility, setRoomFacility] = useState({
    quantity: '',
    description: '',
    room: [],
    facilityAvailable: [],
  });
  const [sortBy, setSortBy] = useState('');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    loadRoomFacilities();
    loadRooms();
    loadFacilitiesAvailable();
  }, []);

  const loadRooms = async () => {
    const result = await axios.get('http://localhost:8080/rooms');
    setRooms(result.data);
  };
  const loadFacilitiesAvailable = async () => {
    const result = await axios.get(
      'http://localhost:8080/facilities_available'
    );
    setFacilitiesAvailable(result.data);
  };

  const loadRoomFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/room_facilities');
      setRoomFacilities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setNewRoom = (name) => {
    const selectedRoomObj = rooms.find((room) => room.name === name);
    setRoomFacility((roomFacility) => ({
      ...roomFacility,
      room: selectedRoomObj,
    }));
  };

  const setNewFacility = (name) => {
    const selectedFacilityObj = facilitiesAvailable.find(
      (facility) => facility.name === name
    );
    setRoomFacility((courseFacility) => ({
      ...courseFacility,
      facilityAvailable: selectedFacilityObj,
    }));
  };

  const handleCancel = () => {
    setShowForm(false);
    setRoomFacility({
      room: [],
      facilityAvailable: [],
      quantity: '',
      description: '',
    });
    setSelectedRoom('');
    setSelectedDescription('');
    setSelectedFacility('');
    setSelectedQuantity('');
  };

  const handleAddRoomFacility = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (roomFacility.id) {
        // Edit mode: Update existing user course
        const response = await axios.put(
          `http://localhost:8080/room_facility/${roomFacility.id}`,
          roomFacility
        );
        console.log('Room facility updated:', response.data);
        toast.success('Room facility updated successfully');
      } else {
        // Add mode: Create new user course
        const response = await axios.post(
          'http://localhost:8080/new_roomFacility',
          roomFacility
        );
        console.log('Room facility created:', response.data);
        toast.success('Room facility added successfully');
      }

      handleCancel();
      loadRoomFacilities();
    } catch (error) {
      console.error('Połączenie pokój-udogodnienie już istnieje:', error);
      toast.error('Połączenie pokój-udogodnienie już istnieje');
    }
  };

  const handleEditRoomFacility = (roomFacility) => {
    setShowForm(true);
    setSelectedRoom(roomFacility.room.name);
    setSelectedFacility(roomFacility.facilityAvailable.name);
    setSelectedQuantity(roomFacility.quantity);
    setSelectedDescription(roomFacility.description);
    setRoomFacility(roomFacility);
  };

  const handleDeleteRoomFacility = async (roomFacilityId) => {
    try {
      await axios.delete(
        `http://localhost:8080/room_facility/${roomFacilityId}`
      );
      console.log('Room facility deleted');
      toast.success('Room facility deleted successfully');
      loadRoomFacilities();
    } catch (error) {
      console.error('Error deleting room facility:', error);
      toast.error('Failed to delete room facility');
    }
  };

  const generateRoomFacilitiesDisplay = () => {
    let sortedRoomFacilities = [...roomFacilities];

    if (sortBy === 'roomName') {
      sortedRoomFacilities = sortedRoomFacilities.sort((a, b) =>
        a.room.name.localeCompare(b.room.name)
      );
    } else if (sortBy === 'facilityName') {
      sortedRoomFacilities = sortedRoomFacilities.sort((a, b) =>
        a.facilityAvailable.name.localeCompare(b.facilityAvailable.name)
      );
    }
    return (
      <>
        <h2 className='room-title'>Udogodnienia kursów</h2>
        <div className='horizontal-line'></div>
        <div className='sort-container'>
          <h4 htmlFor='sort' className='label text-light'>
            Sortuj według:
          </h4>
          <select
            className='form-select'
            id='sort'
            value={sortBy}
            onChange={handleSortBy}>
            <option value=''>Brak sortowania</option>
            <option value='roomName'>Nazwa sali</option>
            <option value='facilityName'>Nazwa udogodnienia</option>
          </select>
        </div>
        <table className='room-table'>
          <thead>
            <tr>
              <th scope='col'>Lp.</th>
              <th scope='col'>Nazwa pokoju</th>
              <th scope='col'>Nazwa udogodnienia</th>
              <th scope='col'>Ilość</th>
              <th scope='col'>Opis</th>
              <th scope='col'>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {sortedRoomFacilities.map((roomFacility, index) => (
              <tr key={roomFacility.id}>
                <td>{index + 1}.</td>
                <td>{roomFacility.room.name}</td>
                <td>{roomFacility.facilityAvailable.name}</td>
                <td>{roomFacility.quantity}</td>
                <td>
                  {roomFacility.description === ''
                    ? 'Brak opisu'
                    : roomFacility.description}
                </td>
                <td>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleEditRoomFacility(roomFacility)}>
                    Edytuj
                  </button>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => handleDeleteRoomFacility(roomFacility.id)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='add-button-wrapper'>
          <button className='add-button' onClick={handleAddRoomFacility}>
            Dodaj
          </button>
        </div>
      </>
    );
  };

  const generateNewRoomFacilityForm = () => {
    return (
      <>
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className={showForm ? 'add-form' : 'hidden'}>
            <h2 className='text-center m-4'>
              Nowe połączenie pokój-udogodnienie
            </h2>

            <div className='form-group'>
              <label htmlFor='Room' className='form-label'>
                Pokój:
              </label>
              <select
                className='form-select'
                value={selectedRoom}
                onChange={(e) => {
                  setSelectedRoom(e.target.value);
                  setNewRoom(e.target.value);
                }}
                required>
                <option value=''>Wybierz jedną z opcji...</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='Facility' className='form-label'>
                Udogodnienie:
              </label>
              <select
                className='form-select'
                value={selectedFacility}
                onChange={(e) => {
                  setSelectedFacility(e.target.value);
                  setNewFacility(e.target.value);
                }}
                required>
                <option value=''>Wybierz jedną z opcji...</option>
                {facilitiesAvailable.map((facility) => (
                  <option key={facility.id} value={facility.name}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='Quantity' className='form-label'>
                Ilość:
              </label>
              <input
                className='form-control'
                type='number'
                min={0}
                value={selectedQuantity}
                onChange={(e) => {
                  setSelectedQuantity(e.target.value);
                  setRoomFacility((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Description' className='form-label'>
                Opis:
              </label>
              <input
                className='form-control'
                type='text'
                value={selectedDescription}
                onChange={(e) => {
                  setSelectedDescription(e.target.value);
                  setRoomFacility((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
            </div>

            <div className='form-buttons'>
              <button type='submit' className='add-button'>
                Dodaj
              </button>
              <button
                type='button'
                className='cancel-button'
                onClick={handleCancel}>
                Anuluj
              </button>
            </div>
          </form>
        )}
      </>
    );
  };

  return (
    <div className='room-wrapper'>
      {generateRoomFacilitiesDisplay()}
      {generateNewRoomFacilityForm()}
      <ToastContainer />
    </div>
  );
};

export default RoomFacilities;
