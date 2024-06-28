import React, { useEffect, useState } from 'react';
import './Holiday.css';

import { addHoliday, getHolidayAPI } from '../../api/holidayapi';
import {
  format,
  parseISO,
  isWithinInterval,
  startOfYear,
  endOfYear,
  addYears,
  isValid,
} from 'date-fns';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Loading from '../../components/Loading/Loading';

export default function Holiday() {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const user = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [holidayList, setHolidayList] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidName = /^[A-Za-z\s]+$/.test(name);
    if (!isValidName) {
      setSnackbar({
        open: true,
        message: 'Holiday name must be alphabets only',
        severity: 'error',
      });
      return;
    }

    const selectedDate = parseISO(date);

    // Validate if date is a valid date and if year is current or next year
    if (!isValid(selectedDate)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid date',
        severity: 'error',
      });
      return;
    }

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const startOfCurrentYear = startOfYear(
      new Date(currentYear, 0, 1)
    );
    const endOfCurrentYear = endOfYear(new Date(currentYear, 11, 31));

    // Check if selected date is within the current year or next year range
    const isValidDate =
      isWithinInterval(selectedDate, {
        start: startOfCurrentYear,
        end: endOfCurrentYear,
      }) ||
      isWithinInterval(selectedDate, {
        start: startOfYear(new Date(nextYear, 0, 1)),
        end: endOfYear(new Date(nextYear, 11, 31)),
      });

    if (!isValidDate) {
      setSnackbar({
        open: true,
        message: `Please select a date between ${format(
          startOfCurrentYear,
          'yyyy-MM-dd'
        )} and ${format(
          endOfCurrentYear,
          'yyyy-MM-dd'
        )} or next year`,
        severity: 'error',
      });
      return;
    }

    try {
      if (date && name) {
        const res = await addHoliday(date, name);
        setError('');
        setDate('');
        setName('');
        getHolidays(); // Reload holidays after adding
        setSnackbar({
          open: true,
          message: 'Holiday added successfully',
          severity: 'success',
        });
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
      setSnackbar({
        open: true,
        message: 'Holiday name must be alphabets only',
        severity: 'error',
      });
    }
  };

  const handleDateBlur = (e) => {
    const inputDate = e.target.value;
    const parsedDate = parseISO(inputDate);

    if (!isValid(parsedDate)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid date',
        severity: 'error',
      });
      return;
    }

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const startOfCurrentYear = startOfYear(
      new Date(currentYear, 0, 1)
    );
    const endOfCurrentYear = endOfYear(new Date(currentYear, 11, 31));

    // Check if selected date is within the current year or next year range
    const isValidDate =
      isWithinInterval(parsedDate, {
        start: startOfCurrentYear,
        end: endOfCurrentYear,
      }) ||
      isWithinInterval(parsedDate, {
        start: startOfYear(new Date(nextYear, 0, 1)),
        end: endOfYear(new Date(nextYear, 11, 31)),
      });

    if (!isValidDate) {
      setSnackbar({
        open: true,
        message: `Please select a date between ${format(
          startOfCurrentYear,
          'yyyy-MM-dd'
        )} and ${format(
          endOfCurrentYear,
          'yyyy-MM-dd'
        )} or next year`,
        severity: 'error',
      });
    }
  };

  const getHolidays = async () => {
    setLoading(true);
    try {
      const res = await getHolidayAPI();
      const currentYear = new Date().getFullYear();
      const startOfCurrentYear = startOfYear(
        new Date(currentYear, 0, 1)
      );
      const endOfCurrentYear = endOfYear(
        new Date(currentYear, 11, 31)
      );

      const holidays = res
        .filter((holiday) => {
          const holidayDate = parseISO(holiday.date);
          return isWithinInterval(holidayDate, {
            start: startOfCurrentYear,
            end: endOfCurrentYear,
          });
        })
        .map((obj) => ({
          ...obj,
          date: format(parseISO(obj.date), 'yyyy-MM-dd'),
        }));
      setHolidayList(holidays);
      setError('');
    } catch (error) {
      setError('Something Went Wrong...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!holidayList.length) {
      getHolidays();
    }
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = holidayList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="holidayContainer">
          <h1>Holidays</h1>
          {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
          {user.canCreateHolidays && (
            <form className="holidayForm" onSubmit={handleSubmit}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={handleDateBlur} // Added onBlur event handler
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
            <>
              <table className="holidayTable">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((holiday) => (
                    <tr key={holiday.date}>
                      <td>{holiday.date}</td>
                      <td>{holiday.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination controls */}
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastItem >= holidayList.length}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <span style={{ color: '#EE404C' }}>
              Holidays are not added
            </span>
          )}

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}
