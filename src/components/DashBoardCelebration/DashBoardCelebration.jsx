import React, { useEffect, useState } from 'react';
import './DashBoardCelebration.css';
import Initials from '../Initials/Initials';
import { getBirthdayEmployeeAPI } from '../../api/userAPI';

export default function DashBoardCelebration() {
  const [employeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState('');

  const getEmployeeListCelebration = async () => {
    try {
      const res = await getBirthdayEmployeeAPI();
      setEmployeeList(res.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (!employeeList.length) {
      getEmployeeListCelebration();
    }
  }, []);

  return (
    <>
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
      <div className="onleaveContainer">
        {employeeList.map((employee) => (
          <div className="employeeTab" key={employee.id}>
            <span>
              {/* <Initials name={employee.fullName} /> */}
            </span>
            <div className="nameTab">
              <span>{employee.fullName}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
