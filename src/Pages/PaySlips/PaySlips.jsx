import React, { useEffect, useState } from 'react';
import './PaySlips.css';
import Dropdown from '../../components/Dropdown/Dropdown';
import { months } from '../../Data/Permission';
import { getPaySlipAPI } from '../../api/payrollapi';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import { disableLoading, enableLoading } from '../../Redux/userSlice';
import { store } from '../../Redux/store';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function PaySlips() {
  const user = useSelector((state) => state.user);
  const loading = useSelector((store) => store.isLoading);
  const [years, setYears] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [yearMonth, setYearMonth] = useState({ year: '', month: '' });
  const [paySlipURL, setPaySlipURL] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const dispatch = useDispatch();

  const getYear = () => {
    store.dispatch(enableLoading());
    const startYear = new Date(user.joiningDate).getFullYear();
    const endYear = new Date().getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    setTimeout(() => {
      store.dispatch(disableLoading());
    }, 2000);
  };

  const handleYears = (e) => {
    const { name, value } = e.target;
    setYearMonth({ ...yearMonth, year: value });
    getMonths();
  };

  const handleMonth = (e) => {
    store.dispatch(enableLoading());
    const { name, value } = e.target;
    yearMonth.month = value;
    setTimeout(() => {
      store.dispatch(disableLoading());
    }, 2000);
  };

  const handlePaySlip = async () => {
    try {
      store.dispatch(enableLoading());
      const res = await getPaySlipAPI({
        year: yearMonth.year,
        month: months.indexOf(yearMonth.month) + 1,
      });

      setPaySlipURL(res.data.payslipUrl);
      setSnackbarMessage('Pay Slip URL fetched successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      if (error.response && error.response.data) {
        setSnackbarMessage(error.response.data.error);
      } else {
        setSnackbarMessage(error.message);
      }
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setTimeout(() => {
        store.dispatch(disableLoading());
      }, 2000);
    }
  };

  const getMonths = () => {
    store.dispatch(enableLoading());
    const startYear = new Date(user.joiningDate).getFullYear();
    const endYear = new Date().getFullYear();
    const startYearMonth = new Date(user.joiningDate).getMonth();
    const endYearMonth = new Date().getMonth();
    if (endYear === startYear) {
      const list = months.slice(startYearMonth, endYearMonth + 1);
      setMonthList(list);
    } else if (yearMonth.year > startYear && yearMonth.year < endYear) {
      setMonthList(months);
    } else if (yearMonth.year === endYear) {
      const list = months.slice(0, endYearMonth + 1);
      setMonthList(list);
    } else if (yearMonth.year === startYear) {
      const list = months.slice(startYearMonth, 12);
      setMonthList(list);
    }
    setTimeout(() => {
      store.dispatch(disableLoading());
    }, 2000);
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.open(paySlipURL, '_blank', 'noopener,noreferrer');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (years.length === 0) {
      getYear();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className={
            user.isAdmin || user.isPayrollExecutive
              ? 'payslipContainer'
              : 'payslipContainer employeePayslip'
          }
        >
          {!(user.isAdmin || user.isPayrollExecutive) && (
            <h1>PaySlips</h1>
          )}
          <div className="payslipSelector">
            <span>
              Year :
              <Dropdown
                options={years}
                name={'year'}
                value={yearMonth.year}
                handleChange={handleYears}
              />
            </span>
            <span>
              Months :{' '}
              <Dropdown
                options={monthList}
                name={'month'}
                value={yearMonth.month}
                handleChange={handleMonth}
              />
            </span>
            <span>
              <button onClick={handlePaySlip}>Get Pay Slip</button>
            </span>
          </div>

          {paySlipURL && (
            <div className="paySlipviewer">
              <a href={paySlipURL} onClick={handleClick}>
                Pay Slip-{yearMonth.year}-{yearMonth.month} Please
                click to view
              </a>
            </div>
          )}
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
