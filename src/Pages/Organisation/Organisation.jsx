import React, { useEffect, useState } from 'react';
import './Organisation.css';
import EmployeeCard from '../../components/Employee/EmployeeCard/EmployeeCard';
import { employeeListAPI } from '../../api/userAPI';
import { useNavigate } from 'react-router-dom';
export default function Organisation() {
  const [employeeList, setEmployeeList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/employee/${id}`);
  };

  const getAllEmployee = async () => {
    const token = localStorage.getItem('token');
    const res = await employeeListAPI(token);

    const list = res.data.filter(
      (obj) => obj.isEmployeeActive && user._id !== obj._id
    );
    setEmployeeList(list);
  };

  useEffect(() => {
    console.log(employeeList.length);
    console.log(employeeList);
    if (employeeList.length === 0) {
      getAllEmployee();
    }
  }, []);
  return (
    <div className="organisation">
      <h1>Organisation</h1>
      <div className="addEmployeeButtonContainer">
        {user.canAddEmployees && (
          <button onClick={() => navigate('/addemployee')}>
            Add Employee
          </button>
        )}
      </div>
      <div className="organisationList">
        {employeeList.map((employee) => (
          <EmployeeCard
            key={employee._id}
            Employee={employee}
            onClick={() => handleCardClick(employee._id)}
          />
        ))}
      </div>
    </div>
  );
}
