import React, { useEffect, useState } from 'react';
import './PayrollEmployeeList.css';
import EmployeeList from '../Employee/EmployeeListContainer/EmployeeList/EmployeeList';
import { formatDate } from 'date-fns';
import { generatePayrollAPI } from '../../api/payrollapi';
export default function PayrollEmployeeList({ employeeList }) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [message, setMessage] = useState({
    message: '',
    status: false,
    stausCode: 400,
  });
  const generatePaySlip = async (id, yearmonth) => {
    console.log('id', id);
    console.log('yearmonth', yearmonth);
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
      console.log(res);

      message.message = res.data.message;
      message.stausCode = 200;
      message.status = true;
    } catch (error) {
      message.message = error.response.data.message;
      message.status = true;
    }
  };
  useEffect(() => {
    message.message = '';
    message.status = false;
    message.stausCode = 400;
  }, []);
  return (
    <div className="payrollEmployeeListContainer">
      {message.status && (
        <span
          style={
            message.stausCode == 200
              ? { color: '#30D143' }
              : { color: '#FD5252' }
          }
        >
          {message.message}
        </span>
      )}
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
