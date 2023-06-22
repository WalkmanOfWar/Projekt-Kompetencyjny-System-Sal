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
        return <DeanGroups />;
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
    <>
      <div className='info-wrapper'>
        <span className='panel-text text-center text-light'>
          Panel sterowania
        </span>
        <select className='form-select d-flex w-100'>
          <option
            value='Room'
            selected={selectedButton === 'Room'}
            onClick={() => handleButtonClick('Room')}>
            Sale
          </option>
          <option
            value='Users'
            selected={selectedButton === 'Users'}
            onClick={() => handleButtonClick('Users')}>
            Użytkownicy
          </option>
          <option
            value='Courses'
            selected={selectedButton === 'Courses'}
            onClick={() => handleButtonClick('Courses')}>
            Przedmioty
          </option>
          <option
            value='Class_schedule'
            selected={selectedButton === 'Class_schedule'}
            onClick={() => handleButtonClick('Class_schedule')}>
            Plan zajęć
          </option>
          <option
            value='Facilities'
            selected={selectedButton === 'Facilities'}
            onClick={() => handleButtonClick('Facilities')}>
            Dostępne udogodnienia
          </option>
          <option
            value='CourseFacilities'
            selected={selectedButton === 'CourseFacilities'}
            onClick={() => handleButtonClick('CourseFacilities')}>
            Udogodnienia kursów
          </option>
          <option
            value='RoomFacilities'
            selected={selectedButton === 'RoomFacilities'}
            onClick={() => handleButtonClick('RoomFacilities')}>
            Udogodnienia sal
          </option>
          <option
            value='Room_types'
            selected={selectedButton === 'Room_types'}
            onClick={() => handleButtonClick('Room_types')}>
            Typy sal
          </option>
          <option
            value='DeanGroups'
            selected={selectedButton === 'DeanGroups'}
            onClick={() => handleButtonClick('DeanGroups')}>
            Grupy dziekańskie
          </option>
          <option
            value='User_courses'
            selected={selectedButton === 'User_courses'}
            onClick={() => handleButtonClick('User_courses')}>
            Przedmioty prowadzących
          </option>
          <option
            value='Reservations'
            selected={selectedButton === 'Reservations'}
            onClick={() => handleButtonClick('Reservations')}>
            Rezerwacje
          </option>
          <option
            value='Adjustments'
            selected={selectedButton === 'Adjustments'}
            onClick={() => handleButtonClick('Adjustments')}>
            Generowanie
          </option>
        </select>
        {renderComponent()}
      </div>
    </>
  );
}

export default ControlPanel;
