import React, { useEffect, useState } from 'react';
import './EmployeeListContainer.css';
import EmployeeList from './EmployeeList/EmployeeList';
import { employeeListAPI } from '../../../api/userAPI';

export default function EmployeeListContainer({
  list,
  addFlag,
  selectedEmployeeIds,
  setSelectedEmployeeIds,
}) {
  const [employeeList, setEmployeeList] = useState([]);

  const handleSetEmployeeList = async () => {
    try {
      let newlist = [];
      if (addFlag) {
        const res = await employeeListAPI();
        newlist = res.data.filter(
          (employee) =>
            !list.some((emp) => emp._id === employee._id) &&
            !employee.isReportingManager
        );
      } else {
        list.map((obj) => {
          newlist.push(obj);
        });
      }

      setEmployeeList(newlist);
    } catch (error) {}
  };

  const handleCheck = (e, employeeId) => {
    console.log('target', e.target.checked);
    if (e.target.checked) {
      setSelectedEmployeeIds([...selectedEmployeeIds, employeeId]);
    } else {
      setSelectedEmployeeIds(
        selectedEmployeeIds.filter((id) => id !== employeeId)
      );
    }
  };

  useEffect(() => {
    if (!employeeList.length) {
      handleSetEmployeeList();
    }
  }, []);
  return (
    <div className="employeelistContainer">
      {employeeList.map((employee) => (
        <EmployeeList
          employee={employee}
          handleCheck={handleCheck}
          employeeDetailFlag={true}
          key={employee._id}
        />
      ))}
    </div>
  );
}
