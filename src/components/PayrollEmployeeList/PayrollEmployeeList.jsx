import React, { useEffect, useState } from 'react';
import './PayrollEmployeeList.css';
import EmployeeList from '../Employee/EmployeeListContainer/EmployeeList/EmployeeList';
import { formatDate } from 'date-fns';
import { months } from '../../Data/Permission';
import { generatePayrollAPI } from '../../api/payrollapi';
import SnackbarMessage from './SnackBarMessage';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

export default function PayrollEmployeeList({ employeeList }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // default severity
  });

  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const generatePaySlip = async (id, yearmonth) => {
    setLoading(true); // Start loading indicator

    let year = formatDate(new Date(), 'yyyy');
    let month = formatDate(new Date(), 'MM');

    if (yearmonth.month) {
      month = months.indexOf(yearmonth.month) + 1;
    }
    if (yearmonth.year) {
      year = yearmonth.year;
    }
    const dateObj = {
      userId: id,
      month: month.toString(),
      year: year.toString(),
    };

    try {
      const res = await generatePayrollAPI(dateObj);

      setSnackbar({
        open: true,
        message: res.data.message,
        severity: 'success',
      });

      // Automatically close the snackbar after 3 seconds
      setTimeout(() => {
        handleCloseSnackbar();
      }, 3000);
    } catch (error) {
      if (error.response) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: error.message,
          severity: 'error',
        });
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="payrollEmployeeListContainer">
      <SnackbarMessage
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000} // Specify the autoHideDuration
      />
      {loading && <CircularProgress size={24} className="loader" />} {/* Display loader when loading is true */}
      {employeeList.map((employee) => (
        <EmployeeList
          employee={employee}
          key={employee._id}
          payrollFlag={true}
          generatePaySlip={generatePaySlip}
        />
      ))}
    </div>
  );
}
