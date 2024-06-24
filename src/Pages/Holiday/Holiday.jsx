import React, { useEffect, useState } from 'react';
import './Holiday.css';

import { addHoliday, getHolidayAPI } from '../../api/holidayapi';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Holiday() {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const user = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [holidayList, setHolidayList] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidName = /^[A-Za-z\s]+$/.test(name);
    if (!isValidName) {
      setSnackbar({ open: true, message: 'Holiday name must be alphabets only', severity: 'error' });
      return;
    }

    try {
      if (date && name) {
        const res = await addHoliday(date, name);
        setError('');
        setDate('');
        setName('');
        getHolidays();
        setSnackbar({ open: true, message: 'Holiday added successfully', severity: 'success' });
      } else {
        setError('Please fill all the fields...');
      }
    } catch (error) {
      setError('Something Went Wrong...');
    }
  };

  const handleNameBlur = () => {
    const isValidName = /^[A-Za-z\s]+$/.test(name);
    if (!isValidName && name.trim() !== '') {
      setSnackbar({ open: true, message: 'Holiday name must be alphabets only', severity: 'error' });
    }
  };

  const getHolidays = async () => {
    try {
      const res = await getHolidayAPI();
      const holidays = res.map((obj) => ({
        ...obj,
        date: format(parseISO(obj.date), 'yyyy-MM-dd'),
      }));
      setHolidayList(holidays);
      setError('');
    } catch (error) {
      setError('Something Went Wrong...');
    }
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
            onBlur={handleNameBlur} // Added onBlur event handler
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
              <th>Date</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {holidayList.map((holiday) => (
              <tr key={holiday.date}>
                <td>{holiday.date}</td>
                <td>{holiday.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span style={{ color: '#EE404C' }}>Holidays are not added</span>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
