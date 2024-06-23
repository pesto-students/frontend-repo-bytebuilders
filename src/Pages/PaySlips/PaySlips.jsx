import React, { useEffect, useState } from 'react';
import './PaySlips.css';
import Dropdown from '../../components/Dropdown/Dropdown';
import { months } from '../../Data/Permission';
import { getPaySlipAPI } from '../../api/payrollapi';
import { useSelector } from 'react-redux';
import { classNames } from '@react-pdf-viewer/core';
export default function PaySlips() {
  const user = useSelector((state) => state.user);
  const [years, setYears] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [yearMonth, setYearMonth] = useState({ year: '', month: '' });
  const [paySlipURL, setPaySlipURL] = useState('');
  const [error, setError] = useState('');
  const getYear = () => {
    const startYear = new Date(user.joiningDate).getFullYear();
    const endYear = new Date().getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    setYears(years);
  };

  const handleYears = (e) => {
    const { name, value } = e.target;
    yearMonth.year = value;
    getMonths();
  };

  const handleMonth = (e) => {
    const { name, value } = e.target;
    yearMonth.month = value;
  };
  const handlePaySlip = async () => {
    try {
      const res = await getPaySlipAPI({
        year: yearMonth.year,
        month: months.indexOf(yearMonth.month) + 1,
      });
      setPaySlipURL(res.data.payslipUrl);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };
  const getMonths = () => {
    const startYear = new Date(user.joiningDate).getFullYear();
    const endYear = new Date().getFullYear();
    const startYearMonth = new Date(user.joiningDate).getMonth();
    const endYearMonth = new Date().getMonth();
    if (endYear == startYear) {
      const list = months.slice(startYearMonth, endYearMonth + 1);

      setMonthList(list);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.open(paySlipURL, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (years.length === 0) {
      getYear();
    }
  }, []);
  return (
    <div
      className={
        user.isAdmin || user.isPayrollExecutive
          ? 'payslipContainer'
          : ' payslipContainer employeePayslip'
      }
    >
      {!(user.isAdmin || user.isPayrollExecutive) && <h1>Payroll</h1>}
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
      <div className="payslipSelector">
        <span>
          Year :
          <Dropdown
            options={years}
            name={'year'}
            handleChange={handleYears}
          />
        </span>
        <span>
          Months :{' '}
          <Dropdown
            options={monthList}
            name={'month'}
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
            Pay Slip-{yearMonth.year}-{yearMonth.month} Please click
            to view
          </a>
        </div>
      )}
    </div>
  );
}
