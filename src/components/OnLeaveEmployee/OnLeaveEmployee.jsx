import React, { useEffect, useState } from 'react';
import './OnLeaveEmployee.css';
import Initials from '../Initials/Initials';
import { employeeOnLeaveAPI } from '../../api/leaveapi';
export default function OnLeaveEmployee() {
  const [employeeeList, setEmployeeList] = useState([]);
  const getInitial = (name) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return words.map((word) => word.charAt(0).toUpperCase()).join('');
  };
  const getEmployeeOnLeave = async () => {
    const res = await employeeOnLeaveAPI();

    setEmployeeList(res.data);
  };
  useEffect(() => {
    if (!employeeeList.length) {
      getEmployeeOnLeave();
    }
  }, []);
  return (
    <div className="onleveContainer">
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
    </div>
  );
}
