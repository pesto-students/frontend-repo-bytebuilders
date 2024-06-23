import React, { useEffect, useState } from 'react';
import './DashBoardCelebration.css';
import Initials from '../Initials/Initials';
import { getBirthdayEmployeeAPI } from '../../api/userAPI';
export default function DashBoardCelebration() {
  const [employeeeList, setEmployeeList] = useState([]);
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
    if (!employeeeList.length) {
      getEmployeeListCelebration();
    }
  }, []);
  return (
    <>
      {error && <p style={{ color: '#FF3F3F' }}></p>}
      <div className="onleveContainer">
        {employeeeList.map((employee) => (
          <div className="employeetab">
            <span>
              <Initials name={employee.fullName} />
            </span>
            <div className="nametab">
              <span>{employee.fullName}</span>

              <span>
                {employee.designation} , {employee.department}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
