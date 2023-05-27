import React, { useEffect, useState } from 'react';
import './Room.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
  const [userList, setUserList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');
  const [sortBy, setSortBy] = useState('');
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8080/users');
    setUserList(result.data);
  };

  const handleAddUser = () => {
    setShowForm(true);
  };

  const [user, setUser] = useState({
    login: '',
    password: '',
    seed: 0,
    first_name: '',
    last_name: '',
    email: '',
    is_admin: false,
    reservations: [],
  });

  const {
    login,
    password,
    seed,
    first_name,
    last_name,
    email,
    is_admin,
    reservations,
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (user.id) {
          // Edycja istniejącego użytkownika
          try {
            await axios.put(`http://localhost:8080/users/${user.id}`, user);
            toast.success('Użytkownik zaktualizowany');
          } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Wystąpił błąd podczas aktualizacji użytkownika.');
          }
        } else {
          // Dodawanie nowego użytkownika
          try {
            await axios.post('http://localhost:8080/new_user', user);
            toast.success('Nowy użytkownik dodany');
          } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Wystąpił błąd podczas dodawania użytkownika.');
          }
        }
        handleCancel();
        loadUsers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    if (!login || !password || !first_name || !last_name || !email) {
      setFormError('Wszystkie pola są wymagane!');
      return false;
    }

    if (!validateEmail(email)) {
      setFormError('Podaj poprawny adres email!');
      return false;
    }

    setFormError('');
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCancel = () => {
    setShowForm(false);
    setUser({
      login: '',
      password: '',
      seed: 0,
      first_name: '',
      last_name: '',
      email: '',
      is_admin: false,
      reservations: [],
    });
    setFormError('');
  };

  const handleEditUser = (editedUser) => {
    setShowForm(true);
    setUser(editedUser);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      toast.success('Użytkownik usunięty');
      loadUsers();
    } catch (error) {
      toast.error('Wystąpił błąd podczas usuwania użytkownika');
      console.log(error);
    }
  };

  const generateUsersDisplay = () => {
    let sortedUsers = [...userList];

    if (sortBy === 'email') {
      sortedUsers = sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortBy === 'firstName') {
      sortedUsers = sortedUsers.sort((a, b) =>
        a.first_name.localeCompare(b.first_name)
      );
    } else if (sortBy === 'lastName') {
      sortedUsers = sortedUsers.sort((a, b) =>
        a.last_name.localeCompare(b.last_name)
      );
    }
    return (
      <>
        <h2 className='room-title'>Użytkownicy</h2>
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
            <option value='email'>Email</option>
            <option value='firstName'>Imię</option>
            <option value='lastName'>Nazwisko</option>
          </select>
        </div>
        <table className='room-table'>
          <thead>
            <tr>
              <th scope='col'>Lp.</th>
              <th scope='col'>Imię</th>
              <th scope='col'>Nazwisko</th>
              <th scope='col'>E-mail</th>
              <th scope='col'>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}.</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => handleEditUser(user)}>
                    Edytuj
                  </button>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => handleDeleteUser(user.id)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='add-button-wrapper'>
          <button className='add-button' onClick={handleAddUser}>
            Dodaj
          </button>
        </div>
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className={showForm ? 'add-form' : 'hidden'}>
            <h2 className='text-center m-4'>
              {user.id ? 'Edytuj użytkownika' : 'Nowy użytkownik'}
            </h2>
            <div className='form-group'>
              <label htmlFor='Login' className='form-label'>
                Login:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Podaj login'
                name='login'
                value={login}
                onChange={onInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='Password' className='form-label'>
                Hasło:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Podaj hasło'
                name='password'
                value={password}
                onChange={onInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='FirstName' className='form-label'>
                Imię:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Podaj imię'
                name='first_name'
                value={first_name}
                onChange={onInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='last_name' className='form-label'>
                Nazwisko:
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Podaj nazwisko'
                name='last_name'
                value={last_name}
                onChange={onInputChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email' className='form-label'>
                Email:
              </label>
              <input
                type='email'
                className='form-control'
                placeholder='Podaj email'
                name='email'
                value={email}
                onChange={onInputChange}
                required
              />
            </div>

            {formError && <div className='form-error'>{formError}</div>}

            <div className='form-buttons'>
              <button type='submit' className='add-button'>
                {user.id ? 'Zapisz' : 'Dodaj'}
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
      {generateUsersDisplay()}
      <ToastContainer />
    </div>
  );
}

export default Users;
