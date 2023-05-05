import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";


function Users() {
  const [userList, setUserList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newIsAdmin, setNewIsAdmin] = useState("");
  const [newReservations, setNewReservations] = useState("");

  useEffect(() => {
    loadUsers()
  }, []);

  const loadUsers = async () => {
      const result = await axios.get("http://localhost:8080/users");
      setUserList(result.data)
  }


  const handleAddUser = () => {
    setShowForm(true);
  };

  const handleLoginChange = (event) => {
    setNewLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setNewFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setNewLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };
  const handleIsAdminChange = (event) => {
    setNewIsAdmin(event.target.value);
  };
  const handleReservationsChange = (event) => {
    setNewReservations(event.target.value);
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newUserId = userList.length + 1;
    setUserList([...userList, { id: newUserId, name: newLogin }]);
    setNewLogin("");
    setNewPassword("");
    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
    document.getElementById("newIsAdmin").checked = false;
    setNewReservations("");
    setShowForm(false);
  };
  
  return (
    <div className="room-wrapper">
      <h2 className="room-title">Lista prowadzących</h2>
      <div className="horizontal-line"></div>
      <table className="room-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}.</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
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
    <div className="form-group">
      <label htmlFor="newLogin">Login:</label>
      <input
        type="text"
        id="newLogin"
        value={newLogin}
        onChange={handleLoginChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newPassword">Hasło:</label>
      <input
        type="text"
        id="newPassword"
        value={newPassword}
        onChange={handlePasswordChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newFirstName">Imię:</label>
      <input
        type="text"
        id="newFirstName"
        value={newFirstName}
        onChange={handleFirstNameChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newLastName">Nazwisko:</label>
      <input
        type="text"
        id="newLastName"
        value={newLastName}
        onChange={handleLastNameChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="newReservations">Rezerwacja:</label>
      <input
        type="number"
        step="1"
        id="newReservations"
        value={newReservations}
        onChange={handleReservationsChange}
      />
    </div>
 
    <div className="form-group">
      <label htmlFor="newIsAdmin">Admin</label>
      <input
        type="checkbox"
        id="newIsAdmin"
        value={newIsAdmin}
        onChange={handleIsAdminChange}
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
    setNewLogin("");
    setNewPassword("");
    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
    document.getElementById("newIsAdmin").checked = false;
    setNewReservations("");
    setShowForm(false);
}

}

export default Users;
