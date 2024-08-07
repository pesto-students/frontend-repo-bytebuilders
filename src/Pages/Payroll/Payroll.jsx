import React, { useEffect, useState } from 'react';
import './Payroll.css';
import { employeeListAPI } from '../../api/userAPI';
import PayrollEmployeeList from '../../components/PayrollEmployeeList/PayrollEmployeeList';
import PaySlips from '../PaySlips/PaySlips';
import { useSelector } from 'react-redux';
export default function Payroll() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectorFlag, setSelectorFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const getEmployee = async () => {
    try {
      const { data } = await employeeListAPI();

      const list = data.filter((employee) => true);
      setEmployeeList(list);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };

  const handleSelector = (value) => {
    setSelectorFlag(value);
  };

  useEffect(() => {
    if (!employeeList.length) {
      getEmployee();
    }
  }, [employeeList]);
  return (
    <div className="payrollContainer">
      <h1>Payroll</h1>
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
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
