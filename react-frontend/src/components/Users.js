import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Users() {
  const [userList, setUserList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUserList(result.data);
  };

  const handleAddUser = () => {
    setShowForm(true);
  };

  const [user, setUser] = useState({
    login: "",
    password: "",
    seed: 0,
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
    reservations: [],
  });

  const { login, password, seed, first_name, last_name, email, is_admin, reservations } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/new_user", user);
        handleCancel();
        loadUsers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    if (!login || !password || !first_name || !last_name || !email) {
      setFormError("Wszystkie pola są wymagane!");
      return false;
    }

    if (!validateEmail(email)) {
      setFormError("Podaj poprawny adres email!");
      return false;
    }

    setFormError("");
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCancel = () => {
    setShowForm(false);
    setUser({
      login: "",
      password: "",
      seed: 0,
      first_name: "",
      last_name: "",
      email: "",
      is_admin: false,
      reservations: [],
    });
    setFormError("");
  };

  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista prowadzących</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th scope="col">Lp.</th>
            <th scope="col">Imię</th>
            <th scope="col">Nazwisko</th>
            <th scope="col">E-mail</th>
            <th scope="col">Akcja</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}.</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-primary mx-2">Edit</button>
                <button className="btn btn-danger mx-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-button-wrapper">
        <button className="add-button" onClick={handleAddUser}>
          Dodaj
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className={showForm ? "add-form" : "hidden"}>
          <h2 className="text-center m-4">Nowy użytkownik</h2>
          <div className="form-group">
            <label htmlFor="Login" className="form-label">
              Login:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Podaj login"
              name="login"
              value={login}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Password" className="form-label">
              Hasło:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Podaj hasło"
              name="password"
              value={password}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="FirstName" className="form-label">
              Imię:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Podaj imię"
              name="first_name"
              value={first_name}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name" className="form-label">
              Nazwisko:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Podaj nazwisko"
              name="last_name"
              value={last_name}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Podaj email"
              name="email"
              value={email}
              onChange={onInputChange}
              required
            />
          </div>

          {formError && <div className="form-error">{formError}</div>}

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

export default Users;
