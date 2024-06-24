import React, { useEffect, useState } from 'react';
import './OnLeaveEmployee.css';
import Initials from '../Initials/Initials';
import { employeeOnLeaveAPI } from '../../api/leaveapi';
export default function OnLeaveEmployee() {
  const [employeeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState('');
  const getEmployeeOnLeave = async () => {
    try {
      const res = await employeeOnLeaveAPI();

      setEmployeeList(res.data);
      setError('');
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
      getEmployeeOnLeave();
    }
  }, []);
  return (
    <>
      {error && <p style={{ color: '#FF3F3F' }}></p>}
      <div className="onleveContainer">
        {employeeeList.length && (
          <>
            <span>On Leave : {employeeeList.length}</span>
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
          </>
        )}
      </div>
    </>
  );
}
