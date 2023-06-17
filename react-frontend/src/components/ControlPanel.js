import React, { useState } from 'react';
import './ControlPanel.css';
import Room from './Room';
import Room_types from './Room_types';
import UserCourses from './UserCourses';
import Courses from './Courses';
import Users from './Users';
import Facilities from './Facilities';
import Reservations from './Reservations';
import Class_schedule from './Class_schedule';
import CourseFacilities from './CourseFacilities';
import RoomFacilities from './RoomFacilities';
import Adjustments from './Adjustments';
import DeanGroups from './DeanGroups';

function ControlPanel() {
  const [selectedButton, setSelectedButton] = useState('Room');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderComponent = () => {
    switch (selectedButton) {
      case 'Room':
        return <Room />;
      case 'Room_types':
        return <Room_types />;
      case 'DeanGroups':
        return <DeanGroups/>;
      case 'User_courses':
        return <UserCourses />;
      case 'Courses':
        return <Courses />;
      case 'Users':
        return <Users />;
      case 'Facilities':
        return <Facilities />;
      case 'CourseFacilities':
        return <CourseFacilities />;
      case 'RoomFacilities':
        return <RoomFacilities />;
      case 'Reservations':
        return <Reservations />;
      case 'Class_schedule':
        return <Class_schedule />;
        case 'Adjustments':
          return <Adjustments />;
      default:
        return <Room />;
    }
  };

  return (
    <div className='info-wrapper'>
      <span className='panel-text'>Panel sterowania</span>
      <div className='container-fluid'>
        <button
          className={`btn btn-primary ${
            selectedButton === 'Room' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('Room')}>
          Sale
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'Users' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('Users')}>
          Użytkownicy
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'Courses' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('Courses')}>
          Przedmioty
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'Class_schedule' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('Class_schedule')}>
          Plan zajęć
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'Facilities' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('Facilities')}>
          Dostępne udogodnienia
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'CourseFacilities' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('CourseFacilities')}>
          Udogodnienia kursów
        </button>
      </div>
      <div className='container-fluid'>
        <button
          className={`btn btn-primary ${
            selectedButton === 'RoomFacilities' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('RoomFacilities')}>
          Udogodnienia sal
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'Room_types' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('Room_types')}>
          Typy sal
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'DeanGroups' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('DeanGroups')}>
          Grupy dziekańskie
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'User_courses' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('User_courses')}>
          Przedmioty prowadzących
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'Reservations' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('Reservations')}>
          Rezerwacje
        </button>
        <button
          className={`btn btn-primary ${
            selectedButton === 'Adjustments' ? 'selected' : ''
          }`}
          onClick={() => handleButtonClick('Adjustments')}>
          Generowanie
        </button>
      </div>
      {renderComponent()}
    </div>
  );
}

export default ControlPanel;
