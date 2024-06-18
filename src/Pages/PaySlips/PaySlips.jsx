import React, { useEffect, useState } from 'react';
import './PaySlips.css';
import Dropdown from '../../components/Dropdown/Dropdown';
import { months } from '../../Data/Permission';
import { getPaySlipAPI } from '../../api/payrollapi';
import PdfViewer from '../../components/Pdfviewer/Pdfviewer';
export default function PaySlips() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [years, setYears] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [yearMonth, setYearMonth] = useState({ year: '', month: '' });
  const [paySlipURL, setPaySlipURL] = useState('');

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
    console.log('yearMonth', yearMonth);
  };
  const handlePaySlip = async () => {
    const res = await getPaySlipAPI({
      year: yearMonth.year,
      month: months.indexOf(yearMonth.month) + 1,
    });
    setPaySlipURL(res.data.payslipUrl);
    console.log(paySlipURL);
  };
  const getMonths = () => {
    const startYear = new Date(user.joiningDate).getFullYear();
    const endYear = new Date().getFullYear();
    const startYearMonth = new Date(user.joiningDate).getMonth();
    const endYearMonth = new Date().getMonth();
    if (endYear == startYear) {
      const list = months.slice(startYearMonth, endYearMonth + 1);

      setMonthList(list);
      console.log(monthList);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.open(paySlipURL, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    getYear();
  }, []);
  return (
    <div className="payslipContainer">
      <div className="payslipSelector">
        <span>
          Year :{' '}
          <Dropdown
            options={years}
            name={'year'}
            handleChange={handleYears}
          />
        </span>
        <span>
          Moths :{' '}
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
      {/* {paySlipURL && <PdfViewer pdfUrl={paySlipURL} />} */}
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
