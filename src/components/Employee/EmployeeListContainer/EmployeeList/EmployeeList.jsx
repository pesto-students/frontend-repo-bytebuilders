import React, { useEffect, useState } from 'react';
import './EmployeeList.css';
import { format, parseISO } from 'date-fns';
import Dropdown from '../../../Dropdown/Dropdown';
import { months } from '../../../../Data/Permission';
export default function EmployeeList({
  employee,
  employeeDetailFlag = false,
  payrollFlag = false,
  handleCheck = null,
  generatePaySlip = null,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [years, setYears] = useState([]);
  const [error, setError] = useState('');

  const [yearMonth, setYearMonth] = useState({
    year: '',
    month: '',
  });
  const getYear = () => {
    const startYear = new Date(employee.joiningDate).getFullYear();
    const endYear = new Date().getFullYear();

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    setYears(years);
  };
  // const handleSetMonth = () => {
  //   console.log(yearMonth);

  //   const dateToday = format(new Date(), 'mm');
  //   console.log(dateToday);
  // };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setYearMonth({ ...yearMonth, year: value });
  // };
  const handleMonth = (e) => {
    const { name, value } = e.target;
    console.log(value);
    yearMonth.month = value;
  };

  const handleYears = (e) => {
    const { name, value } = e.target;

    yearMonth.year = value;
    setYearMonth((prevYearMonth) => ({
      ...prevYearMonth, // Spread previous state
      year: value, // Update name property
    }));
  };

  useEffect(() => {
    if (payrollFlag && years.length == 0) {
      getYear();
    }
  }, []);
  return (
    <>
      <div key={employee._id} className="employeeList">
        {employeeDetailFlag && (
          <input
            type="checkbox"
            onChange={(e) => handleCheck(e, employee._id)}
          />
        )}
        <span>{employee.fullName}</span>
        <span>{employee.designation}</span>
        {payrollFlag && (
          <span>
            <button
              onClick={() => generatePaySlip(employee._id, yearMonth)}
            >
              Generate PaySlip
            </button>
          </span>
        )}
        <span onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '▼' : '►'}
        </span>
      </div>
      {isExpanded && employeeDetailFlag && (
        <div className="emplyeeListDetails">
          <div className="emplyeeListDetailsContainer">
            <div className="employeelistdetails">
              <label htmlFor="fullName">Full Name</label>
              <span>{employee.fullName}</span>
            </div>
            <div className="employeelistdetails">
              <label htmlFor="email">Email</label>
              <span>{employee.email}</span>
            </div>
            <div className="employeelistdetails">
              <label htmlFor="phone">Phone</label>
              <span>{employee.phone}</span>
            </div>
            <div className="employeelistdetails">
              <label htmlFor="phone">
                Employee Identification Code
              </label>
              <span>{employee.employeeIdentificationCode}</span>
            </div>
            <div className="employeelistdetails">
              <label htmlFor="joiningDate">Joining Date</label>
              <span>
                {format(parseISO(employee.joiningDate), 'yyyy-mm-dd')}
              </span>
            </div>
          </div>
        </div>
      )}
      {isExpanded && payrollFlag && (
        <div className="emplyeeListDetails">
          <div className="dateSelector">
            <Dropdown
              name="years"
              options={years}
              value={yearMonth.year}
              handleChange={handleYears}
            />
            <Dropdown
              name="months"
              options={months}
              value={yearMonth.month}
              handleChange={handleMonth}
            />
          </div>
          <div className="emplyeeListDetailsContainer">
            <div className="employeelistdetails">
              <label htmlFor="salary">Salary</label>
              <span>{employee.salary}</span>
            </div>
            <div className="employeelistdetails">
              <label htmlFor="basicSalary">Basic Salary</label>
              <span>{employee.basicSalary}</span>
            </div>
            <div className="employeelistdetails">
              <label htmlFor="hra">HRA</label>
              <span>{employee.hra}</span>
            </div>
            <div className="employeelistdetails">
              <label htmlFor="pf">PF</label>
              <span>{employee.pf}</span>
            </div>
            <div className="employeelistdetails">
              <label htmlFor="specialAllowances">
                Special Allowances
              </label>
              <span>{employee.specialAllowances}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
