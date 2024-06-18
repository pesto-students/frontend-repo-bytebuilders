import React, { useEffect, useState } from 'react';
import './Holiday.css';
import Calender from '../../components/Calender/Calender';
import { getHolidayAPI } from '../../api/holidayapi';
import { format, parseISO } from 'date-fns';

export default function Holiday() {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const [holidayList, setHolidayList] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && name) {
      // onAdd({ id: Date.now(), date, name });
      // setDate('');
      // setName('');
      console.log(date, name);
    }
  };

  const getHolidays = async () => {
    const res = await getHolidayAPI();

    const holidays = res.map((obj) => ({
      ...obj,
      date: format(parseISO(obj.date), 'yyyy-mm-dd'),
    }));
    setHolidayList(holidays);
  };

  useEffect(() => {
    getHolidays();
  }, []);
  return (
    <div className="holidayContainer">
      <h1>Holidays</h1>
      {user.canCreateHolidays && (
        <form className="holidayForm" onSubmit={handleSubmit}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Holiday Name"
            required
          />
          <button type="submit">Add Holiday</button>
        </form>
      )}
      {holidayList.length ? (
        <table className="holidayTable">
          <thead>
            <tr>
              <th> Date</th>
              <th> name</th>
            </tr>
          </thead>
          <tbody>
            {holidayList.map((holiday) => (
              <tr key={holiday.key}>
                <td> {holiday.date}</td>
                <td> {holiday.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span style={{ color: '#EE404C' }}>
          Holidays are not added
        </span>
      )}
    </div>
  );
}
