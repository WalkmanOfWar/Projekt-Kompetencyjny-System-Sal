import React, { useEffect, useState } from "react";
import "./Room.css";
import axios from "axios";

function Facilities() {
  const [facilityList, setFacilityList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newComputers, setNewComputers] = useState("");
  const [newProjectors, setNewProjectors] = useState("");
  const [newCapacity, setNewCapacity] = useState("");
  
  useEffect(() => {
    loadFacilities()
  }, []);

  const loadFacilities = async () => {
      const result = await axios.get("http://localhost:8080/facilities_available");
      setFacilityList(result.data)
  }

  const handleAddFacility = () => {
    setShowForm(true);
  };

  const handleComputersChange = (event) => {
    setNewComputers(event.target.value);
  };

  const handleProjectorsChange = (event) => {
    setNewProjectors(event.target.value);
  };
  const handleCapacityChange = (event) => {
    setNewCapacity(event.target.value);
  };
 



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newFacilityId = facilityList.length + 1;
    setFacilityList([...facilityList, { id: newFacilityId, name: newComputers }]);
    setNewComputers("");
    setNewProjectors("");
    setNewCapacity("");
    setShowForm(false);
  };
  
  return (
    <div className="room-wrapper">
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
        <button className="add-button" onClick={handleAddFacility}>
          Dodaj
        </button>
      
      </div>
      {showForm && (
  <form onSubmit={handleFormSubmit} className={showForm ? "add-form" : "hidden"}>
    <div className="form-group">
      <label htmlFor="newComputers">Liczba komputerów:</label>
      <input
       type="number"
       step="1"
        id="newComputers"
        value={newComputers}
        onChange={handleComputersChange}
        min="0"
      />
    </div>

    <div className="form-group">
      <label htmlFor="newProjectors">Liczba projektorów:</label>
      <input
         type="number"
         step="1"
        id="newProjectors"
        value={newProjectors}
        onChange={handleProjectorsChange}
        min="0"
      />
    </div>
 
    <div className="form-group">
      <label htmlFor="newCapacity">Pojemność:</label>
      <input
         type="number"
         step="1"
        id="newCapacity"
        value={newCapacity}
        onChange={handleCapacityChange}
        min="0"
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
    setNewComputers("");
    setNewProjectors("");
    setNewCapacity("");
    setShowForm(false);
}

}

export default Facilities;
