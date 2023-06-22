import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoomTypes() {
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoomTypeName, setNewRoomTypeName] = useState('');
  const [editRoomType, setEditRoomType] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    const result = await axios.get('http://localhost:8080/room_types');
    setRoomTypeList(result.data);
  };

  const handleAddRoomType = () => {
    setShowForm(true);
  };

  const handleEditRoomType = (roomType) => {
    setShowForm(true);
    setEditRoomType(roomType);
    setNewRoomTypeName(roomType.room_name);
  };

  const handleDeleteRoomType = async (roomType) => {
    try {
      await axios.delete(`http://localhost:8080/room_types/${roomType.id}`);
      const updatedRoomTypeList = roomTypeList.filter(
        (rt) => rt.id !== roomType.id
      );
      setRoomTypeList(updatedRoomTypeList);
      toast.success('Typ sali został usunięty.');
    } catch (error) {
      console.error('Error deleting room type:', error);
      toast.error('Wystąpił błąd podczas usuwania typu sali.');
    }
  };

  const handleRoomTypeNameChange = (event) => {
    setNewRoomTypeName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (editRoomType) {
      try {
        const updatedRoomType = { ...editRoomType, room_name: newRoomTypeName };
        await axios.put(
          `http://localhost:8080/room_types/${editRoomType.id}`,
          updatedRoomType
        );
        const updatedRoomTypeList = roomTypeList.map((rt) =>
          rt.id === editRoomType.id ? { ...rt, room_name: newRoomTypeName } : rt
        );
        setRoomTypeList(updatedRoomTypeList);
        toast.success('Typ sali został zaktualizowany.');
        setEditRoomType(null);
      } catch (error) {
        console.error('Error updating room type:', error);
        toast.error('Wystąpił błąd podczas aktualizacji typu sali.');
      }
    } else {
      const newRoomType = { room_name: newRoomTypeName };
      try {
        const response = await axios.post(
          'http://localhost:8080/new_roomType',
          newRoomType
        );
        const createdRoomType = response.data;
        setRoomTypeList([...roomTypeList, createdRoomType]);
        toast.success('Nowy typ sali został dodany.');
      } catch (error) {
        console.error('Error creating room type:', error);
        toast.error('Wystąpił błąd podczas dodawania nowego typu sali.');
      }
    }

    setNewRoomTypeName('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewRoomTypeName('');
    setEditRoomType(null);
  };

  const generateRoomTypesDisplay = () => {
    let sortedRoomTypes = [...roomTypeList];

    if (sortBy === 'name') {
      sortedRoomTypes = sortedRoomTypes.sort((a, b) =>
        a.room_name.localeCompare(b.room_name)
      );
    }
    return (
      <>
        <h2 className='room-title'>Lista typów sal</h2>
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
            <option value='name'>Nazwa</option>
          </select>
        </div>
        <table className='room-table'>
          <thead>
            <tr>
              <th scope='col'>Lp.</th>
              <th scope='col'>Nazwa</th>
              <th scope='col'>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {sortedRoomTypes.map((roomType, index) => (
              <tr key={roomType.id}>
                <td>{index + 1}.</td>
                <td>{roomType.room_name}</td>
                <td>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleEditRoomType(roomType)}>
                    Edytuj
                  </button>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => handleDeleteRoomType(roomType)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='add-button-wrapper'>
          <button className='add-button' onClick={handleAddRoomType}>
            Dodaj
          </button>
        </div>
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className={showForm ? 'add-form' : 'hidden'}>
            <div className='form-group'>
              <label htmlFor='newRoomTypeName'>Nazwa typu sali:</label>
              <input
                type='text'
                id='newRoomName'
                value={newRoomTypeName}
                onChange={handleRoomTypeNameChange}
                required
              />
            </div>
            <div className='form-buttons'>
              <button type='submit' className='add-button'>
                {editRoomType ? 'Zaktualizuj' : 'Dodaj'}
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
      {generateRoomTypesDisplay()}
      <ToastContainer />
    </div>
  );
}

export default RoomTypes;
