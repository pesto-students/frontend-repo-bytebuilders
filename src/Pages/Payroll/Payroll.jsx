import React, { useEffect, useState } from 'react';
import './Payroll.css';
import { employeeListAPI } from '../../api/userAPI';
import PayrollEmployeeList from '../../components/PayrollEmployeeList/PayrollEmployeeList';
import PaySlips from '../PaySlips/PaySlips';
export default function Payroll() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectorFlag, setSelectorFlag] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const getEmployee = async () => {
    const { data } = await employeeListAPI();

    const list = data.filter(
      (employee) => employee.reportingManager === user.fullName
    );
    setEmployeeList(list);
  };

  const handleSelector = (value) => {
    setSelectorFlag(value);
  };

  useEffect(() => {
    getEmployee();
  });
  return (
    <div className="payrollContainer">
      <h1>Payroll</h1>
      <div className="payrollSelector">
        <span onClick={() => handleSelector(false)}>My Team</span>
        <span>|</span>
        <span onClick={() => handleSelector(true)}>Pay Slips</span>
      </div>
      <div className="payrollEmployeeList">
        {selectorFlag ? (
          <PaySlips />
        ) : (
          <PayrollEmployeeList employeeList={employeeList} />
        )}
      </div>
    </div>
  );
}
