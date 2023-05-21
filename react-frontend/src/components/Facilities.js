import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Facilities() {
  const [facilityList, setFacilityList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadFacilities();
  }, []);

  const [facility, setFacility] = useState({
    name: "",
  });

  const { name } = facility;

  const onInputChange = (e) => {
    setFacility({ ...facility, [e.target.name]: e.target.value });
  };

  const loadFacilities = async () => {
    const result = await axios.get(
      "http://localhost:8080/facilities_available"
    );
    setFacilityList(result.data);
  };

  const handleAddFacility = () => {
    setShowForm(true);
  };
  const handleCancel = () => {
    setShowForm(false);
  };

  const checkIfFacilityExists = (facility) => {
    return facilityList.some(
      (existingFacility) => existingFacility.name === facility.name
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!checkIfFacilityExists(facility)) {
      await axios.post("http://localhost:8080/new_facilityAvailable", facility);
    }
    handleCancel();
    loadFacilities();
  };

  function generateFacilitiesDisplay() {
    return (
      <>
        <h2 className="room-title">Lista Udogodnień</h2>
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
            {facilityList.map((facility, index) => (
              <tr key={facility.id}>
                <td>{index + 1}.</td>
                <td>{facility.name}</td>
                <td>
                  <button className="btn btn-primary mx-2">Edit</button>
                  <button className="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-button-wrapper">
          <button className="add-button" onClick={handleAddFacility}>
            Dodaj
          </button>
        </div>
      </>
    );
  }

  function generateNewFacilityForm() {
    return (
      <>
        {showForm && (
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={showForm ? "add-form" : "hidden"}>
            <h2 className="text-center m-4">Nowe udogodnienie</h2>
            <div className="form-group">
              <label htmlFor="Name" className="form-label">
                Nazwa:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Podaj nazwę"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
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
      {generateFacilitiesDisplay()}
      {generateNewFacilityForm()}
    </div>
  );
}

export default Facilities;
