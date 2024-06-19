import React, { useEffect, useState } from 'react';
import './Holiday.css';

import { addHoliday, getHolidayAPI } from '../../api/holidayapi';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';

export default function Holiday() {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const user = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [holidayList, setHolidayList] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (date && name) {
        const res = await addHoliday();

        setError('');
        getHolidays();
      } else {
        setError('Please fill all the fields...');
      }
    } catch (error) {}
  };

  const getHolidays = async () => {
    try {
      const res = await getHolidayAPI();

      const holidays = res.map((obj) => ({
        ...obj,
        date: format(parseISO(obj.date), 'yyyy-mm-dd'),
      }));
      setHolidayList(holidays);
    } catch (error) {}
  };

  useEffect(() => {
    if (!holidayList.length) {
      getHolidays();
    }
  }, []);
  return (
    <div className="holidayContainer">
      <h1>Holidays</h1>
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
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
              <tr key={holiday.date}>
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
