import React, { useState, useEffect } from 'react';
import './GenerateHomeTable.css';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function GenerateHomeTable() {
  const [roomList, setRoomList] = useState([]);
  const [deanGroups, setDeanGroups] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('no-reservations');
  const [selectedDeanGroup, setSelectedDeanGroup] = useState('no-reservations');
  const [reservations, setReservations] = useState([]);
  const [course, setCourse] = useState('');
  const [room, setRoom] = useState('');
  const [selectedScheduleType, setSelectedScheduleType] = useState('');
  const [displaySchedule, setDisplaySchedule] = useState(false);

  const scheduleTypeOptions = [
    { value: 'no-plan', text: 'Wybierz jedną z opcji...' },
    { value: 'student-plan', text: 'Plan dla studentów' },
    { value: 'teacher-plan', text: 'Plan dla wykładowców' },
  ];

  const days = [
    { value: 1, text: 'Poniedziałek' },
    { value: 2, text: 'Wtorek' },
    { value: 3, text: 'Środa' },
    { value: 4, text: 'Czwartek' },
    { value: 5, text: 'Piątek' },
  ];
  const isParity = [
    { id: 0, name: '-' },
    { id: 1, name: 'x1' },
    { id: 2, name: 'x2' },
  ];

  const startingTimeSlots = [
    '08:15:00',
    '09:15:00',
    '10:15:00',
    '11:15:00',
    '12:15:00',
    '13:15:00',
    '14:15:00',
    '15:15:00',
    '16:15:00',
    '17:15:00',
    '18:15:00',
    '19:15:00',
  ];

  const endingTimeSlots = [
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
    '20:00:00',
  ];

  useEffect(() => {
    loadRooms();
    loadDeanGroups();
  }, []);

  const loadRooms = async () => {
    const result = await axios.get('http://localhost:8080/rooms');
    setRoomList(result.data);
  };

  const loadDeanGroups = async () => {
    const result = await axios.get('http://localhost:8080/dean-groups');
    setDeanGroups(result.data);
  };

  const handleSelectedRoom = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleSelectedDeanGroup = (e) => {
    setSelectedDeanGroup(e.target.value);
  };

  const handleSelectedScheduleType = (e) => {
    setSelectedScheduleType(e.target.value);
  };

  const getisParityName = (is_parity) => {
    const temp = isParity.find((p) => p.id === is_parity);
    return temp ? temp.name : '';
  };

  function generateTableHeader() {
    return (
      <thead>
        <tr>
          <th>Lp.</th>
          <th>08:15 - 09:00</th>
          <th>09:15 - 10:00</th>
          <th>10:15 - 11:00</th>
          <th>11:15 - 12:00</th>
          <th>12:15 - 13:00</th>
          <th>13:15 - 14:00</th>
          <th>14:15 - 15:00</th>
          <th>15:15 - 16:00</th>
          <th>16:15 - 17:00</th>
          <th>17:15 - 18:00</th>
          <th>18:15 - 19:00</th>
          <th>19:15 - 20:00</th>
        </tr>
      </thead>
    );
  }

  const displayCourseType = (courseType) => {
    switch (courseType) {
      case 0:
        return 'L, ';
      case 1:
        return 'W, ';
      default:
        return '';
    }
  };

  const fetchReservations = async () => {
    try {
      if (selectedRoom !== 'no-reservations') {
        console.log(selectedRoom);
        const response = await axios.get(
          `http://localhost:8080/class_schedules/room/name/${selectedRoom}`
        );
        console.log(response.data);
        setReservations(response.data);
      }
      if (selectedDeanGroup !== 'no-reservations') {
        console.log(selectedDeanGroup);
        const response = await axios.get(
          `http://localhost:8080/class_schedules/dean-group/name/${selectedDeanGroup}`
        );
        console.log(response.data);
        setReservations(response.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    if (
      selectedRoom !== 'no-reservations' ||
      selectedDeanGroup !== 'no-reservations'
    ) {
      fetchReservations();
    } else {
      setReservations([]);
    }
  }, [selectedRoom, selectedDeanGroup]);

  function parseTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes, seconds);
  }

  function compareTime(time1, time2) {
    return time1.getTime() - time2.getTime();
  }

  function generateTableContent() {
    return (
      <tbody>
        {days.map((day) => (
          <tr key={day.id}>
            <td>{day.text}</td>
            {Array.from({ length: 12 }, (_, index) => {
              const startTime = parseTime(startingTimeSlots[index]);
              const endTime = parseTime(endingTimeSlots[index]);

              const matchingReservations = reservations.filter(
                (reservation) =>
                  day.value === reservation.day_of_week &&
                  compareTime(startTime, parseTime(reservation.start_time)) >=
                    0 &&
                  compareTime(parseTime(reservation.end_time), endTime) >= 0
              );

              return (
                <td key={index}>
                  {matchingReservations.length > 0 &&
                    generateCombinedReservationCard(matchingReservations)}
                  {/* {generateCombinedReservationCard(reservations)} */}
                  {/* Test  */}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  }

  function generateCombinedReservationCard(reservations) {
    if (reservations.length === 1) {
      return generateSingleReservationCard(reservations[0]);
    }

    return (
      <>
        {reservations.map((reservation, index) => (
          <div className='card-container pe-none' key={index}>
            <div className='card text-dark bg-light'>
              <h5 className='card-header' style={{ fontSize: '14px' }}>
                {displayCourseType(reservation.course.course_type)}{' '}
                {reservation.start_week}-{reservation.end_week},{' '}
                {getisParityName(reservation.is_parity)}
              </h5>
              <div className='card-body'>
                <p className='card-text' style={{ fontSize: '12px' }}>
                  {reservation.course.name} | {reservation.room.name}
                </p>
                <p className='card-text' style={{ fontSize: '12px' }}>
                  {reservation.user.first_name} {reservation.user.last_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  function generateSingleReservationCard(reservation) {
    if (!reservation) {
      return (
        <div className='card-container pe-none'>
          <div className='card text-dark bg-light'>
            <div className='card-body'>
              <p className='card-text'>&nbsp;</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='card-container pe-none'>
        <div className='card text-dark bg-light'>
          <h5 className='card-header' style={{ fontSize: '14px' }}>
            {displayCourseType(reservation.course.course_type)}{' '}
            {reservation.start_week}-{reservation.end_week},{' '}
            {getisParityName(reservation.is_parity)}
          </h5>
          <div className='card-body'>
            <p className='card-text' style={{ fontSize: '12px' }}>
              {reservation.course.name} | {reservation.room.name}
            </p>
            <p className='card-text' style={{ fontSize: '12px' }}>
              {reservation.user.first_name} {reservation.user.last_name}
            </p>
          </div>
        </div>
      </div>
    );
  }

  function generateTable() {
    const scheduleType = scheduleTypeOptions.find(
      (option) => option.value === selectedScheduleType
    );
    const scheduleTypeText =
      scheduleType && scheduleType.value !== 'no-plan' ? scheduleType.text : '';
    const room = roomList.find((option) => option.name === selectedRoom);
    const roomText = room ? room.name : '';

    return (
      <table
        id='pdf-content-wrapper'
        className='card justify-content-center align-items-center text-dark bg-light mb-3'
        style={{ display: 'inline-block', padding: '10px' }}>
        <div className='card-header bg-light'>{scheduleTypeText}</div>
        <div className='card-title'>{roomText}</div>
        <div className='card-title'>
          {selectedDeanGroup !== 'no-reservations' ? selectedDeanGroup : ''}
        </div>
        <div className='card-body'>
          <div
            className='table table-responsive table-light'
            xs={{ width: '100%', height: '100%' }}>
            {generateTableHeader()}
            {generateTableContent()}
          </div>
        </div>
      </table>
    );
  }

  async function generatePDF() {
    const input = document.getElementById('pdf-content-wrapper');
    const { offsetWidth, scrollWidth, offsetHeight, scrollHeight } = input;

    const contentWidth = Math.max(offsetWidth, scrollWidth);
    const contentHeight = Math.max(offsetHeight, scrollHeight);

    const aspectRatio = contentWidth / contentHeight;

    try {
      const canvas = await html2canvas(input, {
        width: contentWidth,
        height: contentHeight,
        dpi: 600,
      });

      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF({
        orientation: aspectRatio > 1 ? 'l' : 'p',
        unit: 'pt',
        format: [contentWidth, contentHeight],
        compress: false,
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, contentWidth, contentHeight);
      pdf.save('download.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  async function generateInteractivePDF() {
    const div = document.getElementById('pdf-content-wrapper');

    if (!div) {
      console.error('No div found with the provided ID');
      return;
    }

    try {
      const pdf = new jsPDF('l', 'pt', 'a4');
      pdf.setLanguage('pl');
      pdf.setFont('PTSans');
      pdf.setFontSize(12);

      const tableData = [];
      const rows = div.querySelectorAll('tr');
      rows.forEach((row) => {
        const rowData = [];
        const cells = row.querySelectorAll('th, td');
        cells.forEach((cell) => {
          rowData.push(cell.innerText);
        });
        tableData.push(rowData);
      });

      const headers = tableData.shift();

      pdf.autoTable({
        head: [headers],
        body: tableData,
      });

      pdf.save('download.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  return (
    <div className='container-fluid background'>
      <div className='row'>
        <div className='d-inline-flex justify-content-center align-items-center'>
          <div className=' col-2 mb-3 mx-2 d-flex flex-column p-3 my-4'>
            <button className='btn btn-primary' onClick={generatePDF}>
              Wygeneruj PDF
            </button>
          </div>
          <div className=' col-2 mb-3 mx-2 d-flex flex-column p-3 my-4'>
            <button
              className='btn btn-primary'
              onClick={generateInteractivePDF}>
              Wygeneruj interaktywny PDF
            </button>
          </div>
          {/* <div className=' col-2 mb-3 mx-2 d-flex flex-column p-3'>
            <label className='text-start ms-1' for='occupation'>
              Wybór planu
            </label>
            <select
              className='form-select d-block w-100 mt-1'
              value={selectedScheduleType}
              onChange={handleSelectedScheduleType}>
              {scheduleTypeOptions.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
          </div> */}
          <div className=' col-2 mb-3 mx-2 d-flex flex-column p-3'>
            <label className='text-center' for='room'>
              Wybór sali
            </label>
            <select
              className='form-select d-block w-100 mt-1'
              value={selectedRoom}
              onChange={handleSelectedRoom}
              disabled={selectedDeanGroup !== 'no-reservations'}>
              <option value='no-reservations'>Wybierz jedną z opcji...</option>
              {roomList.map((room) => (
                <option value={room.value}>{room.name}</option>
              ))}
            </select>
          </div>
          <div className=' col-2 mb-3 mx-2 d-flex flex-column p-3'>
            <label className='text-center' for='deanGroup'>
              Wybór grupy dziekańskiej
            </label>
            <select
              className='form-select d-block w-100 mt-1'
              value={selectedDeanGroup}
              onChange={handleSelectedDeanGroup}
              disabled={selectedRoom !== 'no-reservations'}>
              <option value='no-reservations'>Wybierz jedną z opcji...</option>
              {deanGroups.map((deanGroup) => (
                <option value={deanGroup.value}>{deanGroup.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TUTAJ GENEROWANA TABELKA */}
      <div className='print-page'>{generateTable()}</div>
    </div>
  );
}
